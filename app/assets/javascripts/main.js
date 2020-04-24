'use strict';

{
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 180 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const react = document.getElementById('react');
  
  
  let inputElement = document.querySelector('input[class="answer"]');
  
  
  
  // 要素を取得
  let ele = document.getElementById('question');
    // let react = document.getElementById('question').children(input[:text]);
  // let answer = document.getElementById("answer");
  // 現在の visibility プロパティの値を保持
  const visibilityOriginal = ele.style.visibility;
  
  // const visibility = react.style.visibility;
  
  // hidden に設定して非表示
  ele.style.visibility = 'hidden';
  
  // react.style.visibility = 'hidden';
 
  
  
  // 変数testの要素を入力不可にする
  

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