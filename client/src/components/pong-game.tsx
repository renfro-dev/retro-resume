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
  const [playerPaddle, setPlayerPaddle] = useState(250); // Y position
  const [aiPaddle, setAiPaddle] = useState(250);
  const [emailLettersRevealed, setEmailLettersRevealed] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;
  const PADDLE_WIDTH = 20;
  const PADDLE_HEIGHT = 100;
  const BALL_SIZE = 20;
  const PADDLE_SPEED = 6;
  const WIN_SCORE = 5; // First to 5 wins
  const AI_SPEED = 4; // Slightly slower than player for fairness
  const EMAIL_ADDRESS = "joshua@renfro.dev"; // Will be revealed letter by letter

  // Reset ball to center with random direction
  const resetBall = useCallback(() => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    setBall({
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      dx: direction * (3 + Math.random() * 2), // Random speed 3-5
      dy: (Math.random() - 0.5) * 4 // Random vertical direction
    });
  }, []);

  // Initialize game
  useEffect(() => {
    if (isOpen && gameState === 'playing') {
      setPlayerScore(0);
      setAiScore(0);
      setEmailLettersRevealed(0);
      setPlayerPaddle(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
      setAiPaddle(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
      resetBall();
    }
  }, [isOpen, gameState, resetBall]);

  // Keyboard controls
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

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  // Game loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return;

    const gameLoop = () => {
      // Move player paddle
      if (keysPressed.current.has('arrowup') || keysPressed.current.has('w')) {
        setPlayerPaddle(prev => Math.max(0, prev - PADDLE_SPEED));
      }
      if (keysPressed.current.has('arrowdown') || keysPressed.current.has('s')) {
        setPlayerPaddle(prev => Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + PADDLE_SPEED));
      }

      // AI paddle movement (simple AI that follows the ball)
      setBall(prevBall => {
        const ballCenterY = prevBall.y + BALL_SIZE / 2;
        const aiPaddleCenterY = aiPaddle + PADDLE_HEIGHT / 2;
        
        if (ballCenterY < aiPaddleCenterY - 10) {
          setAiPaddle(prev => Math.max(0, prev - AI_SPEED));
        } else if (ballCenterY > aiPaddleCenterY + 10) {
          setAiPaddle(prev => Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + AI_SPEED));
        }

        // Move ball
        let newX = prevBall.x + prevBall.dx;
        let newY = prevBall.y + prevBall.dy;
        let newDx = prevBall.dx;
        let newDy = prevBall.dy;

        // Ball collision with top/bottom walls
        if (newY <= 0 || newY >= GAME_HEIGHT - BALL_SIZE) {
          newDy = -newDy;
          newY = newY <= 0 ? 0 : GAME_HEIGHT - BALL_SIZE;
        }

        // Ball collision with player paddle (left side)
        if (newX <= PADDLE_WIDTH && 
            newY + BALL_SIZE >= playerPaddle && 
            newY <= playerPaddle + PADDLE_HEIGHT &&
            prevBall.dx < 0) {
          newDx = -newDx;
          newX = PADDLE_WIDTH;
          // Add spin based on where ball hits paddle
          const hitPosition = (newY + BALL_SIZE/2 - playerPaddle) / PADDLE_HEIGHT - 0.5;
          newDy += hitPosition * 2;
          
          // Reveal next letter of email address
          setEmailLettersRevealed(prev => Math.min(prev + 1, EMAIL_ADDRESS.length));
        }

        // Ball collision with AI paddle (right side)
        if (newX + BALL_SIZE >= GAME_WIDTH - PADDLE_WIDTH && 
            newY + BALL_SIZE >= aiPaddle && 
            newY <= aiPaddle + PADDLE_HEIGHT &&
            prevBall.dx > 0) {
          newDx = -newDx;
          newX = GAME_WIDTH - PADDLE_WIDTH - BALL_SIZE;
          // Add spin based on where ball hits paddle
          const hitPosition = (newY + BALL_SIZE/2 - aiPaddle) / PADDLE_HEIGHT - 0.5;
          newDy += hitPosition * 2;
        }

        // Ball goes off left side (AI scores)
        if (newX < 0) {
          setAiScore(prev => {
            const newScore = prev + 1;
            if (newScore >= WIN_SCORE) {
              setGameState('lost');
            } else {
              setTimeout(resetBall, 1000);
            }
            return newScore;
          });
          return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, dx: 0, dy: 0 };
        }

        // Ball goes off right side (Player scores)
        if (newX > GAME_WIDTH) {
          setPlayerScore(prev => {
            const newScore = prev + 1;
            if (newScore >= WIN_SCORE) {
              setGameState('won');
            } else {
              setTimeout(resetBall, 1000);
            }
            return newScore;
          });
          return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, dx: 0, dy: 0 };
        }

        // Limit ball speed
        newDx = Math.max(-8, Math.min(8, newDx));
        newDy = Math.max(-6, Math.min(6, newDy));

        return { x: newX, y: newY, dx: newDx, dy: newDy };
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, gameState, playerPaddle, aiPaddle, resetBall]);

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
          <div className="absolute top-4 left-4 text-[var(--terminal-green)] font-mono text-lg z-10">
            <div>Player: {playerScore}</div>
          </div>

          <div className="absolute top-4 right-4 text-[var(--terminal-green)] font-mono text-lg z-10">
            <div>AI: {aiScore}</div>
          </div>

          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-[var(--terminal-yellow)] font-mono text-sm z-10">
            <div>First to {WIN_SCORE} wins • W/S or ↑/↓ to move • ESC to exit</div>
          </div>

          {/* Email Reveal Display */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10">
            <div className="text-center">
              <div className="text-[var(--terminal-gray)] font-mono text-xs mb-1">
                Email revealed by paddle hits:
              </div>
              <div className="font-mono text-lg tracking-wider">
                <span className="text-[var(--terminal-green)] drop-shadow-glow">
                  {EMAIL_ADDRESS.substring(0, emailLettersRevealed)}
                </span>
                <span className="text-[var(--terminal-gray)] opacity-30">
                  {EMAIL_ADDRESS.substring(emailLettersRevealed).replace(/./g, '_')}
                </span>
              </div>
              <div className="text-[var(--terminal-yellow)] font-mono text-xs mt-1">
                {emailLettersRevealed}/{EMAIL_ADDRESS.length} letters revealed
              </div>
            </div>
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
            {/* Center line */}
            <div
              className="absolute bg-[var(--terminal-gray)] opacity-50"
              style={{
                left: GAME_WIDTH / 2 - 1,
                top: 0,
                width: 2,
                height: GAME_HEIGHT,
                background: 'repeating-linear-gradient(to bottom, var(--terminal-gray) 0px, var(--terminal-gray) 20px, transparent 20px, transparent 40px)'
              }}
            />

            {/* Player Paddle (Left) */}
            <div
              className="absolute bg-[var(--terminal-green)]"
              style={{
                left: 0,
                top: playerPaddle,
                width: PADDLE_WIDTH,
                height: PADDLE_HEIGHT,
                boxShadow: '0 0 10px var(--terminal-green)'
              }}
            />

            {/* AI Paddle (Right) */}
            <div
              className="absolute bg-[var(--terminal-green)]"
              style={{
                right: 0,
                top: aiPaddle,
                width: PADDLE_WIDTH,
                height: PADDLE_HEIGHT,
                boxShadow: '0 0 10px var(--terminal-green)'
              }}
            />

            {/* Ball */}
            <div
              className="absolute bg-[var(--terminal-yellow)] rounded-full"
              style={{
                left: ball.x,
                top: ball.y,
                width: BALL_SIZE,
                height: BALL_SIZE,
                boxShadow: '0 0 15px var(--terminal-yellow)'
              }}
            />

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
                      <div className="text-[var(--terminal-gray)] text-lg font-mono mb-6">
                        AI wins {aiScore}-{playerScore}
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