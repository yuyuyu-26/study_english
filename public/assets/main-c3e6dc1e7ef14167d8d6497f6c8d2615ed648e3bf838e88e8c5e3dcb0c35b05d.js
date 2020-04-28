'use strict';

{
  const timeLimit = 180 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const react = document.getElementById('react');
  
  
  let inputElement = document.querySelector('input[class="answer"]');
  let ele = document.getElementById('question');
  const visibilityOriginal = ele.style.visibility;
  ele.style.visibility = 'hidden';

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
    
    if (timeLeft < 0) {
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      ele.style.visibility = 'hidden';

      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = 'Finish!!';
      react.textContent = 'テストが終了しました　回答ボタンを押してください';
    }
  }
  
  window.addEventListener('click', () => {
    
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
   
    ele.style.visibility = visibilityOriginal;
    
    target.textContent = '';
    startTime = Date.now();
    updateTimer();
  });

}
;
