import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

interface PongGameProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: () => void;
}

export default function PongGame({ isOpen, onClose, onWin }: PongGameProps) {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [ball, setBall] = useState<Ball>({ x: 400, y: 300, dx: 4, dy: 3 });
  const [playerPaddle, setPlayerPaddle] = useState(250);
  const [aiPaddle, setAiPaddle] = useState(250);
  const [phoneDigitsRevealed, setPhoneDigitsRevealed] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());
  const touchStartY = useRef<number>(0);
  const paddleTargetY = useRef<number>(250);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive game dimensions
  const getGameDimensions = () => {
    const isMobileDevice = window.innerWidth < 768;
    return {
      width: isMobileDevice ? Math.min(window.innerWidth - 40, 400) : 800,
      height: isMobileDevice ? Math.min(window.innerHeight - 200, 500) : 600,
      paddleWidth: isMobileDevice ? 15 : 20,
      paddleHeight: isMobileDevice ? 80 : 100,
      ballSize: isMobileDevice ? 15 : 20,
      paddleSpeed: isMobileDevice ? 8 : 6,
      aiSpeed: isMobileDevice ? 5 : 4
    };
  };

  const [gameDimensions, setGameDimensions] = useState(getGameDimensions());
  const WIN_SCORE = 5;
  const PHONE_NUMBER = "619-629-8452";

  // Reset ball to center with random direction
  const resetBall = useCallback(() => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const dimensions = getGameDimensions();
    setBall({
      x: dimensions.width / 2,
      y: dimensions.height / 2,
      dx: direction * (3 + Math.random() * 2),
      dy: (Math.random() - 0.5) * 4
    });
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newDimensions = getGameDimensions();
      setGameDimensions(newDimensions);
      setIsMobile(window.innerWidth < 768);
      
      // Reset paddle positions for new dimensions
      const centerY = newDimensions.height / 2 - newDimensions.paddleHeight / 2;
      setPlayerPaddle(centerY);
      setAiPaddle(centerY);
      paddleTargetY.current = centerY;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize game
  useEffect(() => {
    if (isOpen && gameState === 'playing') {
      const dimensions = getGameDimensions();
      setPlayerScore(0);
      setAiScore(0);
      setPhoneDigitsRevealed(0);
      const centerY = dimensions.height / 2 - dimensions.paddleHeight / 2;
      setPlayerPaddle(centerY);
      setAiPaddle(centerY);
      paddleTargetY.current = centerY;
      resetBall();
    }
  }, [isOpen, gameState, resetBall]);

  // Keyboard and touch controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!gameAreaRef.current) return;
      
      const rect = gameAreaRef.current.getBoundingClientRect();
      const touchY = e.touches[0].clientY - rect.top;
      const dimensions = gameDimensions;
      
      // Convert touch position to paddle position
      const paddleY = Math.max(0, Math.min(dimensions.height - dimensions.paddleHeight, touchY - dimensions.paddleHeight / 2));
      paddleTargetY.current = paddleY;
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      
      if (gameAreaRef.current) {
        gameAreaRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        gameAreaRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      if (gameAreaRef.current) {
        gameAreaRef.current.removeEventListener('touchstart', handleTouchStart);
        gameAreaRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isOpen, gameDimensions]);

  // Game loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return;

    const gameLoop = () => {
      const dimensions = gameDimensions;
      
      setBall(prevBall => {
        const newBall = { ...prevBall };
        
        // Move ball
        newBall.x += newBall.dx;
        newBall.y += newBall.dy;
        
        // Ball collision with top/bottom walls
        if (newBall.y <= 0 || newBall.y >= dimensions.height - dimensions.ballSize) {
          newBall.dy = -newBall.dy;
        }
        
        // Ball collision with paddles
        // Left paddle (player) collision
        if (newBall.x <= dimensions.paddleWidth && 
            newBall.y >= playerPaddle && 
            newBall.y <= playerPaddle + dimensions.paddleHeight) {
          newBall.dx = Math.abs(newBall.dx);
          newBall.dy += (Math.random() - 0.5) * 2;
          
          // Progressive phone number reveal
          setPhoneDigitsRevealed(prev => Math.min(prev + 1, PHONE_NUMBER.length));
        }
        
        // Right paddle (AI) collision  
        if (newBall.x >= dimensions.width - dimensions.paddleWidth - dimensions.ballSize && 
            newBall.y >= aiPaddle && 
            newBall.y <= aiPaddle + dimensions.paddleHeight) {
          newBall.dx = -Math.abs(newBall.dx);
          newBall.dy += (Math.random() - 0.5) * 2;
        }
        
        // Ball goes off screen (scoring)
        if (newBall.x < 0) {
          setAiScore(prev => prev + 1);
          // Return current ball position to prevent further updates this frame
          setTimeout(resetBall, 100);
          return prevBall;
        } else if (newBall.x > dimensions.width) {
          setPlayerScore(prev => prev + 1);
          // Return current ball position to prevent further updates this frame
          setTimeout(resetBall, 100);
          return prevBall;
        }
        
        return newBall;
      });

      // Update paddles
      setPlayerPaddle(prevPos => {
        let newPos = prevPos;
        
        // Keyboard controls
        if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
          newPos = Math.max(0, newPos - dimensions.paddleSpeed);
        }
        if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
          newPos = Math.min(dimensions.height - dimensions.paddleHeight, newPos + dimensions.paddleSpeed);
        }
        
        // Touch controls - smooth movement towards target
        if (isMobile) {
          const diff = paddleTargetY.current - prevPos;
          if (Math.abs(diff) > 2) {
            newPos = prevPos + Math.sign(diff) * Math.min(Math.abs(diff) * 0.1, dimensions.paddleSpeed);
          }
        }
        
        return newPos;
      });

      setAiPaddle(prevPos => {
        // Simple AI: follow the ball
        const ballCenterY = ball.y + dimensions.ballSize / 2;
        const paddleCenterY = prevPos + dimensions.paddleHeight / 2;
        
        if (ballCenterY < paddleCenterY - 10) {
          return Math.max(0, prevPos - dimensions.aiSpeed);
        } else if (ballCenterY > paddleCenterY + 10) {
          return Math.min(dimensions.height - dimensions.paddleHeight, prevPos + dimensions.aiSpeed);
        }
        
        return prevPos;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, gameState, ball, playerPaddle, aiPaddle, resetBall, gameDimensions, isMobile]);

  // Check win conditions
  useEffect(() => {
    if (playerScore >= WIN_SCORE) {
      setGameState('won');
    } else if (aiScore >= WIN_SCORE) {
      setGameState('lost');
    }
  }, [playerScore, aiScore]);

  // Reset game function
  const resetGame = useCallback(() => {
    setGameState('playing');
    setPlayerScore(0);
    setAiScore(0);
    setPhoneDigitsRevealed(0);
    const dimensions = getGameDimensions();
    const centerY = dimensions.height / 2 - dimensions.paddleHeight / 2;
    setPlayerPaddle(centerY);
    setAiPaddle(centerY);
    paddleTargetY.current = centerY;
    resetBall();
  }, [resetBall]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-black border-2 border-[var(--terminal-cyan)] rounded-lg p-4 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Game Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-mono text-[var(--terminal-cyan)] terminal-glow">
                PONG CHALLENGE
              </h2>
              <button
                onClick={onClose}
                className="text-[var(--terminal-red)] hover:text-[var(--terminal-yellow)] text-xl font-mono"
              >
                [X]
              </button>
            </div>

            {/* Score and Progress */}
            <div className="flex justify-between items-center mb-4 text-[var(--terminal-green)] font-mono text-sm sm:text-base">
              <div>PLAYER: {playerScore}</div>
              <div className="text-center flex-1 mx-4">
                <div className="text-xs sm:text-sm">Phone revealed by paddle hits:</div>
                <div className="text-sm sm:text-lg font-bold">
                  {phoneDigitsRevealed > 0 ? PHONE_NUMBER.substring(0, phoneDigitsRevealed) : ''}
                  <span className="text-[var(--terminal-gray)]">
                    {'█'.repeat(PHONE_NUMBER.length - phoneDigitsRevealed)}
                  </span>
                </div>
                <div className="text-xs">
                  {phoneDigitsRevealed}/{PHONE_NUMBER.length} characters
                </div>
              </div>
              <div>AI: {aiScore}</div>
            </div>

            {/* Game Area */}
            <div className="flex justify-center">
              <div 
                ref={gameAreaRef}
                className="relative bg-black border border-[var(--terminal-gray)] touch-none"
                style={{
                  width: `${gameDimensions.width}px`,
                  height: `${gameDimensions.height}px`
                }}
              >
                {/* Center line */}
                <div 
                  className="absolute border-l border-dashed border-[var(--terminal-gray)] opacity-50"
                  style={{
                    left: `${gameDimensions.width / 2}px`,
                    height: '100%'
                  }}
                />

                {/* Player paddle */}
                <div
                  className="absolute bg-[var(--terminal-green)] rounded-sm"
                  style={{
                    left: '0px',
                    top: `${playerPaddle}px`,
                    width: `${gameDimensions.paddleWidth}px`,
                    height: `${gameDimensions.paddleHeight}px`
                  }}
                />

                {/* AI paddle */}
                <div
                  className="absolute bg-[var(--terminal-red)] rounded-sm"
                  style={{
                    right: '0px',
                    top: `${aiPaddle}px`,
                    width: `${gameDimensions.paddleWidth}px`,
                    height: `${gameDimensions.paddleHeight}px`
                  }}
                />

                {/* Ball */}
                <div
                  className="absolute bg-[var(--terminal-yellow)] rounded-full"
                  style={{
                    left: `${ball.x}px`,
                    top: `${ball.y}px`,
                    width: `${gameDimensions.ballSize}px`,
                    height: `${gameDimensions.ballSize}px`
                  }}
                />

                {/* Game over overlay */}
                {gameState !== 'playing' && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-mono text-[var(--terminal-yellow)] mb-4">
                        {gameState === 'won' ? 'VICTORY!' : 'GAME OVER'}
                      </div>
                      {gameState === 'won' && (
                        <div className="text-sm sm:text-lg font-mono text-[var(--terminal-green)] mb-4">
                          Phone number fully revealed!
                        </div>
                      )}
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => {
                            if (gameState === 'won') {
                              onWin();
                            }
                            onClose();
                          }}
                          className="px-6 py-2 bg-[var(--terminal-cyan)] text-black font-mono hover:bg-[var(--terminal-yellow)] transition-colors"
                        >
                          {gameState === 'won' ? 'CLAIM VICTORY' : 'EXIT'}
                        </button>
                        {gameState === 'lost' && (
                          <button
                            onClick={resetGame}
                            className="px-6 py-2 bg-[var(--terminal-green)] text-black font-mono hover:bg-[var(--terminal-yellow)] transition-colors"
                          >
                            PLAY AGAIN
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 text-center text-[var(--terminal-gray)] font-mono text-xs sm:text-sm">
              {isMobile ? 'Touch and drag to move paddle' : 'Use W/S or Arrow Keys to move paddle'} • First to {WIN_SCORE} wins • ESC to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}