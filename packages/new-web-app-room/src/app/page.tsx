'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated Orange Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ff6b35" strokeWidth="1" opacity="0.6"/>
              </pattern>
              <pattern id="grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#ff8c42" strokeWidth="2" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="animate-pulse"/>
            <rect width="100%" height="100%" fill="url(#grid-large)" className="animate-pulse" style={{animationDelay: '1s'}}/>
          </svg>
        </div>
        
        {/* Floating orange particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-500/20 p-6 w-full max-w-sm">
          {/* Display */}
          <div className="bg-black rounded-lg p-4 mb-4 border border-orange-500/30">
            <div className="text-right text-white text-3xl font-mono overflow-hidden">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button
              onClick={clear}
              className="col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              onClick={clearEntry}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              CE
            </button>
            <button
              onClick={() => inputOperation('÷')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputNumber('7')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              7
            </button>
            <button
              onClick={() => inputNumber('8')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              8
            </button>
            <button
              onClick={() => inputNumber('9')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              9
            </button>
            <button
              onClick={() => inputOperation('×')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputNumber('4')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              4
            </button>
            <button
              onClick={() => inputNumber('5')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              5
            </button>
            <button
              onClick={() => inputNumber('6')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              6
            </button>
            <button
              onClick={() => inputOperation('-')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              -
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputNumber('1')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              1
            </button>
            <button
              onClick={() => inputNumber('2')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              2
            </button>
            <button
              onClick={() => inputNumber('3')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              3
            </button>
            <button
              onClick={() => inputOperation('+')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              .
            </button>
            <button
              onClick={performCalculation}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

