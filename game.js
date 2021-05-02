(function() {
  var CSS = {
    arena: {
      width: 900,
      height: 600,
      background: '#62247B',
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: '999',
      transform: 'translate(-50%, -50%)'
    },
    ball: {
      width: 15,
      height: 15,
      position: 'absolute',
      top: 0,
      left: 350,
      borderRadius: 50,
      konum: 0,
      background: '#C6A62F'
    },
    line: {
      width: 0,
      height: 600,
      borderLeft: '2px dashed #C6A62F',
      position: 'absolute',
      top: 0,
      left: '50%'
    },
    yazi: {
      width: 50,
      height: 60,
      font: '50px sans-serif',
      color: '#fff',
      position: 'absolute',
      top: 0,

    },
    yazi1: {
      left: 0

    },
    yazi2: {
      right: 0
    },
    yazi3: {
      left: 320
    },
    stick: {
      width: 12,
      height: 85,
      position: 'absolute',
      background: '#C6A62F'
    },
    stick1: {
      left: 0,
      top: 150
    },
    stick2: {
      right: 0,
      top: 150
    },
    pause: {
      pause_durum: 0,
      pause_konum: 0
    }
  };

  var CONSTS = {
    gameSpeed: 20,
    score1: 0,
    score2: 0,
    stick1Speed: 0,
    stick2Speed: 0,
    ballTopSpeed: 0,
    ballLeftSpeed: 0
  };

  function start() {
    draw();
    setEvents();
    roll();
    loop();
  }

  function draw() {
    $('<div/>', {
      id: 'pong-game'
    }).css(CSS.arena).appendTo('body');
    $('<div/>', {
      id: 'pong-line'
    }).css(CSS.line).appendTo('#pong-game');
    $('<div/>', {
      id: 'pong-ball'
    }).css(CSS.ball).appendTo('#pong-game');
    $('<div/>', {
        id: 'stick-1'
      }).css($.extend(CSS.stick1, CSS.stick))
      .appendTo('#pong-game');
    $('<div/>', {
        id: 'stick-2'
      }).css($.extend(CSS.stick2, CSS.stick))
      .appendTo('#pong-game');
    $('<div/>', {
      id: 'text1'
    }).css($.extend(CSS.yazi1, CSS.yazi)).appendTo('#pong-game');
    $('<div/>', {
      id: 'text2'
    }).css($.extend(CSS.yazi2, CSS.yazi)).appendTo('#pong-game');
    $('<div/>', {
      id: 'text3'
    }).css($.extend(CSS.yazi3, CSS.yazi)).appendTo('#pong-game');
  }

  function setEvents() {

    $(document).on('keydown', function(e) {
      if (e.keyCode == 87) {

        CONSTS.stick1Speed += -10;
      }
    });

    $(document).on('keyup', function(e) {
      if (e.keyCode == 87) {
        CONSTS.stick1Speed = 0;
      }
    });

    $(document).on('keydown', function(e) {
      if (e.keyCode == 83) {
        CONSTS.stick1Speed += +10;
      }
    });

    $(document).on('keyup', function(e) {
      if (e.keyCode == 83) {
        CONSTS.stick1Speed = 0;
      }
    });

    $(document).on('keydown', function(e) {
      if (e.keyCode == 38) {
        CONSTS.stick2Speed += -10;
      }
    });

    $(document).on('keyup', function(e) {
      if (e.keyCode == 38) {
        CONSTS.stick2Speed = 0;
      }
    });

    $(document).on('keydown', function(e) {
      if (e.keyCode == 40) {
        CONSTS.stick2Speed += +10;
      }
    });
    $(document).on('keyup', function(e) {
      if (e.keyCode == 40) {
        CONSTS.stick2Speed = 0;
      }
    });

    $(document).on('keyup', function(e) {
      if (e.keyCode == 80) {

        if (CSS.pause.pause_durum == 0) {
          document.getElementById("text3").innerHTML = "Oyun Durduruldu";
          CSS.pause.pause_konum = CSS.ball.konum;
          CSS.pause.pause_durum = 1;
          CSS.ball.konum = 3;


        } else if (CSS.pause.pause_durum == 1) {
          var person = prompt("Adresi Giriniz", "Harry Potter");
          if (person == "http://corporate.lcwaikiki.com/hakkimizda") {
            document.getElementById("text3").innerHTML = "";
            CSS.pause.pause_durum = 0;
            CSS.ball.konum = CSS.pause.pause_konum;
          }

        }

      }
    });


  }

  function loop() {
    window.pongLoop = setInterval(function() {
      CSS.stick1.top += CONSTS.stick1Speed;
      $('#stick-1').css('top', CSS.stick1.top);

      CSS.stick2.top += CONSTS.stick2Speed;
      $('#stick-2').css('top', CSS.stick2.top);

      if (CSS.ball.konum == 1) {

        CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
        CSS.ball.left += -10;
      }
      if (CSS.ball.konum == 0) {
        CSS.ball.top += CONSTS.ballTopSpeed;
        CSS.ball.left += 10;
      }

      if (CSS.ball.top <= 0 ||
        CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
        CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;

      }
      $('#pong-ball').css({
        top: CSS.ball.top,
        left: CSS.ball.left
      });

      if (CSS.ball.left <= CSS.stick.width) {
        CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || roll();

        var cubuk1 = document.getElementById("stick-1");
        var top = document.getElementById("pong-ball");
        var cubuk1_ust = cubuk1.offsetTop;
        var cubuk1_alt = Number(cubuk1_ust) + 85;
        if ((cubuk1_ust <= CSS.ball.top && cubuk1_alt >= CSS.ball.top)) {
          CSS.ball.konum = 0;
          if (CSS.ball.konum == 0) {
            CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * +1;
            CSS.ball.left += +10;
          }
        } else {
          CONSTS.score1 = CONSTS.score1 + 1;
          roll();
        }
      }
      if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {

        var cubuk = document.getElementById("stick-2");
        var top = document.getElementById("pong-ball");
        var cubuk_ust = cubuk.offsetTop;
        var cubuk_alt = Number(cubuk_ust) + 85;
        if ((cubuk_ust <= CSS.ball.top && cubuk_alt >= CSS.ball.top)) {
          CSS.ball.konum = 1;
          if (CSS.ball.konum == 1) {
            CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            CSS.ball.left += -10;
          }
        } else {
          CONSTS.score2 = CONSTS.score2 + 1;
          roll();
        }



      }


    }, CONSTS.gameSpeed);
  }

  function roll() {
    document.getElementById("text1").innerHTML = CONSTS.score2;
    document.getElementById("text2").innerHTML = CONSTS.score1;

    if (CONSTS.score1 >= 5 || CONSTS.score2 >= 5) {
      CSS.ball.top = CSS.arena.height / 2 - 5;
      CSS.ball.left = CSS.arena.width / 2 - 5;
      CSS.ball.konum = 3;
  document.getElementById("text3").innerHTML = "Kazandınız";
    } else {
      CSS.ball.top = CSS.arena.height / 2 - 5;
      CSS.ball.left = CSS.arena.width / 2 - 5;
      var side = -1;
      if (Math.random() < 0.5) {
        side = 1;
      }

      CONSTS.ballTopSpeed = Math.random() * -2 - 3;
      CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
      CSS.ball.konum = Math.floor((Math.random() * 10) + 1) % 2;
    }
  }
  start();
})();
