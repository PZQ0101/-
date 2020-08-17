$(function () {
  // 公共变量
  var timer, score = 0, currentScore = 0;

  $('.start').click(function () {
    $('.game').fadeIn(500);
    addRow();
    $('.fail').css({
      display: 'none'
    });
    $('.row:last').remove();
    currentScore = 0;
  });

  $('.back').click(function () {
    $('.game').fadeOut(500);
    $('.fail-content>.top').text('输了，兄dei！');
  })

  $('.go').click(function () {
    $('.fail').fadeOut(500);
    $('.row:last').remove();
    addRow();
    currentScore = 0;
    $('.fail-content>.top').text('输了，兄dei！');
  })

  $('.row').map(function () {
    let num = parseInt(Math.random() * 4);
    console.log(num)
    $(this).children().eq(num).addClass('active');
  })

  $('.grid').delegate(".active", "click", function () {
    $(this).removeClass('active');
    $(this).parent().remove();
    currentScore++;
  });

  // 游戏输了
  function fail() {
    const observer = new MutationObserver((mutationList, observer) => {
      if (400 * $(mutationList[0].target).children().length > window.innerHeight) {
        clearInterval(timer);
        $('.fail').css({
          display: 'block'
        });
        if (currentScore > score) {
          console.log(currentScore)
          score = currentScore;
          $('.score>span').text(score);
          window.localStorage.setItem("score", score);
          $('.fail-content>.top').text('破纪录了!');
        }
      }
    })
    const config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    observer.observe($('.grid')[0], config)
  }

  // 添加一行方块
  function addRow() {
    let row = `<div class="row">
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>`;
  
      timer = setInterval(() => {
      let num = parseInt(Math.random() * 4);
      $('.grid').prepend(row);
      $('.row').eq(0).children().eq(num).addClass('active');
    }, 1000);
  }

  // 获取localStorage存储的数据
  function getScore() {
    if (localStorage.getItem('score') === undefined || localStorage.getItem('score') === null) {
      return
    }
    score = parseInt(localStorage.getItem('score'));
    $('.score>span').text(score);
  }

  // 入口函数
  function init() {
    getScore();
    fail();
  }

  init();
});