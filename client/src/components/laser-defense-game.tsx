import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Enemy {
  id: string;
  x: number;
  y: number;
  speed: number;
}

interface Laser {
  id: string;
  x: number;
  y: number;
  fromPlayer: boolean;
}

interface Explosion {
  id: string;
  x: number;
  y: number;
  frame: number;
}

interface LaserDefenseGameProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: () => void;
}

export default function LaserDefenseGame({ isOpen, onClose, onWin }: LaserDefenseGameProps) {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [lasers, setLasers] = useState<Laser[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [playerPosition, setPlayerPosition] = useState(50); // percentage from left
  const [wave, setWave] = useState(1);
  const [enemiesDestroyed, setEnemiesDestroyed] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastShotTime = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;
  const PLAYER_SPEED = 1.5; // Reduced from 3 for less sensitive movement
  const LASER_SPEED = 8;
  const ENEMY_SPEED = 1;
  const ENEMIES_PER_WAVE = 3; // Reduced from 5
  const WIN_CONDITION = 8; // Reduced from 15 to make easier

  // Generate enemy wave
  const generateEnemies = useCallback((waveNum: number) => {
    const newEnemies: Enemy[] = [];
    for (let i = 0; i < ENEMIES_PER_WAVE + waveNum; i++) {
      newEnemies.push({
        id: `enemy-${Date.now()}-${i}`,
        x: Math.random() * (GAME_WIDTH - 40),
        y: -50 - (i * 60),
        speed: ENEMY_SPEED + (waveNum * 0.5)
      });
    }
    return newEnemies;
  }, []);

  // Initialize game
  useEffect(() => {
    if (isOpen && gameState === 'playing') {
      setEnemies(generateEnemies(1));
      setScore(0);
      setLives(3);
      setWave(1);
      setEnemiesDestroyed(0);
    }
  }, [isOpen, gameState, generateEnemies]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
      
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const now = Date.now();
        if (now - lastShotTime.current > 200) { // Rate limit shooting
          const newLaser: Laser = {
            id: `laser-${now}`,
            x: (playerPosition / 100) * GAME_WIDTH + 15, // Center of player ship
            y: GAME_HEIGHT - 80,
            fromPlayer: true
          };
          setLasers(prev => [...prev, newLaser]);
          lastShotTime.current = now;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, playerPosition]);

  // Game loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return;

    const gameLoop = () => {
      // Move player
      if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
        setPlayerPosition(prev => Math.max(0, prev - PLAYER_SPEED));
      }
      if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
        setPlayerPosition(prev => Math.min(100, prev + PLAYER_SPEED));
      }

      // Move enemies
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        y: enemy.y + enemy.speed
      })).filter(enemy => enemy.y < GAME_HEIGHT + 50));

      // Move lasers
      setLasers(prev => prev.map(laser => ({
        ...laser,
        y: laser.fromPlayer ? laser.y - LASER_SPEED : laser.y + LASER_SPEED
      })).filter(laser => laser.y > -50 && laser.y < GAME_HEIGHT + 50));

      // Check collisions between lasers and enemies
      setEnemies(prev => {
        const remainingEnemies = [...prev];
        setLasers(prevLasers => {
          const remainingLasers = [...prevLasers];
          
          for (let i = remainingEnemies.length - 1; i >= 0; i--) {
            const enemy = remainingEnemies[i];
            for (let j = remainingLasers.length - 1; j >= 0; j--) {
              const laser = remainingLasers[j];
              if (laser.fromPlayer &&
                  Math.abs(laser.x - (enemy.x + 20)) < 30 &&
                  Math.abs(laser.y - (enemy.y + 20)) < 30) {
                
                // Create explosion at enemy position
                const explosion: Explosion = {
                  id: `explosion-${Date.now()}-${i}`,
                  x: enemy.x + 10,
                  y: enemy.y + 10,
                  frame: 0
                };
                setExplosions(prevExplosions => [...prevExplosions, explosion]);
                
                remainingEnemies.splice(i, 1);
                remainingLasers.splice(j, 1);
                setScore(prev => prev + 100);
                setEnemiesDestroyed(prev => prev + 1);
                break;
              }
            }
          }
          
          return remainingLasers;
        });
        
        return remainingEnemies;
      });

      // Update explosions
      setExplosions(prev => prev.map(explosion => ({
        ...explosion,
        frame: explosion.frame + 1
      })).filter(explosion => explosion.frame < 10)); // Remove after 10 frames

      // Check if enemies reached bottom (player hit)
      setEnemies(prev => {
        const hitEnemies = prev.filter(enemy => enemy.y > GAME_HEIGHT - 100);
        if (hitEnemies.length > 0) {
          setLives(prevLives => {
            const newLives = prevLives - hitEnemies.length;
            if (newLives <= 0) {
              setGameState('lost');
            }
            return Math.max(0, newLives);
          });
        }
        return prev.filter(enemy => enemy.y <= GAME_HEIGHT - 100);
      });

      // Check win condition
      if (enemiesDestroyed >= WIN_CONDITION) {
        setGameState('won');
        return;
      }

      // Spawn new wave if all enemies destroyed
      if (enemies.length === 0) {
        const nextWave = wave + 1;
        setWave(nextWave);
        setEnemies(generateEnemies(nextWave));
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, gameState, enemies.length, wave, enemiesDestroyed, generateEnemies]);

  // Handle game won
  useEffect(() => {
    if (gameState === 'won') {
      setTimeout(() => {
        onWin();
        onClose();
      }, 2000);
    }
  }, [gameState, onWin, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      >
        <div className="relative">
          {/* Game UI */}
          <div className="absolute top-4 left-4 text-[var(--terminal-green)] font-mono text-sm z-10">
            <div>Score: {score}</div>
            <div>Lives: {lives}</div>
            <div>Wave: {wave}</div>
            <div>Destroyed: {enemiesDestroyed}/{WIN_CONDITION}</div>
          </div>

          <div className="absolute top-4 right-4 text-[var(--terminal-yellow)] font-mono text-xs z-10">
            <div>Arrow Keys / A,D - Move</div>
            <div>Spacebar - Shoot</div>
            <div>ESC - Exit</div>
          </div>

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative bg-black border-2 border-[var(--terminal-green)] overflow-hidden"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
            }}
            tabIndex={0}
          >
            {/* Player Ship */}
            <div
              className="absolute bottom-8 w-8 h-8 transition-all duration-75"
              style={{
                left: `${playerPosition}%`,
                transform: 'translateX(-50%)',
                background: `
                  conic-gradient(from 0deg, 
                    #00ff00 0deg 45deg,
                    #ffffff 45deg 90deg,
                    #0066ff 90deg 135deg,
                    #ffffff 135deg 180deg,
                    #00ff00 180deg 225deg,
                    #ffffff 225deg 270deg,
                    #0066ff 270deg 315deg,
                    #ffffff 315deg 360deg
                  )
                `,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />

            {/* Enemies */}
            {enemies.map(enemy => (
              <div
                key={enemy.id}
                className="absolute w-10 h-8"
                style={{
                  left: enemy.x,
                  top: enemy.y,
                  background: `
                    conic-gradient(from 0deg,
                      #ff0000 0deg 60deg,
                      #ffffff 60deg 120deg,
                      #ff0000 120deg 180deg,
                      #ffffff 180deg 240deg,
                      #ff0000 240deg 300deg,
                      #ffffff 300deg 360deg
                    )
                  `,
                  clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
                }}
              />
            ))}

            {/* Lasers */}
            {lasers.map(laser => (
              <div
                key={laser.id}
                className="absolute w-1 h-4"
                style={{
                  left: laser.x,
                  top: laser.y,
                  background: laser.fromPlayer ? '#00ff00' : '#ff0000',
                  boxShadow: `0 0 10px ${laser.fromPlayer ? '#00ff00' : '#ff0000'}`
                }}
              />
            ))}

            {/* Explosions */}
            {explosions.map(explosion => (
              <div
                key={explosion.id}
                className="absolute w-8 h-8 pointer-events-none"
                style={{
                  left: explosion.x,
                  top: explosion.y,
                  background: `radial-gradient(circle, 
                    ${explosion.frame < 3 ? '#ffffff' : explosion.frame < 6 ? '#ffff00' : '#ff6600'} 0%, 
                    ${explosion.frame < 3 ? '#ffff00' : explosion.frame < 6 ? '#ff6600' : '#ff0000'} 50%, 
                    transparent 100%)`,
                  borderRadius: '50%',
                  transform: `scale(${0.5 + (explosion.frame * 0.15)})`,
                  opacity: 1 - (explosion.frame * 0.1),
                  boxShadow: `0 0 ${explosion.frame * 2}px ${explosion.frame < 5 ? '#ffff00' : '#ff0000'}`
                }}
              />
            ))}

            {/* Game Over Overlay */}
            {gameState !== 'playing' && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                <div className="text-center">
                  {gameState === 'won' ? (
                    <div>
                      <div className="text-[var(--terminal-green)] text-4xl font-bold mb-4 pixel-font">
                        VICTORY!
                      </div>
                      <div className="text-[var(--terminal-yellow)] text-xl font-mono">
                        Unlocking Contact Information...
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-red-500 text-4xl font-bold mb-4 pixel-font">
                        GAME OVER
                      </div>
                      <button
                        onClick={() => setGameState('playing')}
                        className="px-6 py-3 bg-[var(--terminal-yellow)] text-black font-mono hover:bg-[var(--terminal-green)] transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}