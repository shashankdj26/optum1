var CameraMovement = pc.createScript("cameraMovement");
CameraMovement.attributes.add("paths", {
  type: "entity",
  description: "Path Sets",
}),
  CameraMovement.attributes.add("refresh", {
    type: "number",
    description: "Path refresh facter",
  }),
  CameraMovement.attributes.add("target", {
    type: "entity",
    description: "Camera target",
  }),
  CameraMovement.attributes.add("distance", {
    type: "number",
    description: "Camera distance from target",
  }),
  CameraMovement.attributes.add("offsetCam", { type: "vec3" }),
  (CameraMovement.prototype.initialize = function () {
    (this._cameraPostion = this.entity.getPosition()),
      (this.isNeedRefresh = !1),
      (this.nextRefeesh = this.refresh),
      (this.refreshId = 1),
      (this.indexID = 0),
      (this._roadsStartPosition = []),
      (this.roads = []);
    for (var t = 0; t < this.paths.children.length; t++) {
      this.roads.push(this.paths.children[t]);
      var e = new pc.Vec3();
      e.copy(this.paths.children[t].getLocalPosition()),
        this._roadsStartPosition.push(e);
    }
  }),
  (CameraMovement.prototype.update = function (t) {
    this.entity.setPosition(this.target.getPosition()),
      this.entity.translateLocal(this.offsetCam),
      this.refreshRoadPostion(this.entity.getPosition().z);
  }),
  (CameraMovement.prototype.refreshRoadPostion = function (t) {
    if (
      (t >= this.nextRefeesh && (this.isNeedRefresh = !0), this.isNeedRefresh)
    ) {
      (this.isNeedRefresh = !1),
        this.refreshId++,
        (this.nextRefeesh = this.refresh * this.refreshId);
      var e = pc.math.random(0, 8);
      (e = Math.floor(e)),
        0 === this.indexID
          ? (this.roads[0].setPosition(0, 0, this.nextRefeesh),
            this.roads[0].script.randomPath.madePath(e),
            (this.indexID = 1))
          : (this.roads[1].setPosition(0, 0, this.nextRefeesh),
            this.roads[1].script.randomPath.madePath(e),
            (this.indexID = 0));
    }
  }),
  (CameraMovement.prototype.resetCamera = function () {
    this.entity.setPosition(this._cameraPostion),
      (this.isNeedRefresh = !1),
      (this.nextRefeesh = this.refresh),
      (this.refreshId = 1),
      (this.indexID = 0);
    var t = pc.math.random(0, 8);
    (t = Math.floor(t)),
      this.roads[0].script.randomPath.madePath(t),
      this.roads[1].script.randomPath.madePath(t);
    for (t = 0; t < this.roads.length; t++)
      this.roads[t].setLocalPosition(this._roadsStartPosition[t]);
  });
var RandomPath = pc.createScript("randomPath");
RandomPath.attributes.add("obstacle", {
  type: "entity",
  description: "obstacle parent",
}),
  RandomPath.attributes.add("collecatble", {
    type: "entity",
    description: "Collectable Points",
  }),
  (RandomPath.prototype.initialize = function () {
    this.environments = [];
    for (var e = 0; e < this.entity.children.length; e++)
      this.environments.push(this.entity.children[e]);
    this.obstacleScripts = [];
    for (e = 0; e < this.obstacle.children.length; e++)
      this.obstacleScripts.push(this.obstacle.children[e]);
    this.collectableCollection = [];
    for (e = 0; e < this.collecatble.children.length; e++)
      this.collectableCollection.push(this.collecatble.children[e]);
  }),
  (RandomPath.prototype.madePath = function (e) {
    0 === e
      ? ((this.environments[0].enabled = !1),
        (this.environments[1].enabled = !1),
        (this.environments[2].enabled = !1))
      : 1 === e
      ? ((this.environments[0].enabled = !0),
        (this.environments[1].enabled = !1),
        (this.environments[2].enabled = !1))
      : 2 === e
      ? ((this.environments[0].enabled = !0),
        (this.environments[1].enabled = !0),
        (this.environments[2].enabled = !1))
      : 3 == e
      ? ((this.environments[0].enabled = !0),
        (this.environments[1].enabled = !0),
        (this.environments[2].enabled = !0))
      : 4 === e
      ? ((this.environments[0].enabled = !1),
        (this.environments[1].enabled = !0),
        (this.environments[2].enabled = !1))
      : 5 === e
      ? ((this.environments[0].enabled = !1),
        (this.environments[1].enabled = !1),
        (this.environments[2].enabled = !0))
      : 6 === e
      ? ((this.environments[0].enabled = !0),
        (this.environments[1].enabled = !1),
        (this.environments[2].enabled = !0))
      : ((this.environments[0].enabled = !1),
        (this.environments[1].enabled = !0),
        (this.environments[2].enabled = !0));
    for (var t = 0; t < this.obstacleScripts.length; t++)
      this.obstacleScripts[t].script.obstacles.updateObstacle();
    for (t = 0; t < this.collectableCollection.length; t++)
      this.collectableCollection[
        t
      ].script.collectableRefresh.updateCollection();
  });
var Obstacles = pc.createScript("obstacles");
(Obstacles.prototype.initialize = function () {
  this.obstacleArray = [];
  for (var t = 0; t < this.entity.children.length; t++)
    this.obstacleArray.push(this.entity.children[t]);
}),
  (Obstacles.prototype.update = function (t) {}),
  (Obstacles.prototype.updateObstacle = function () {
    var t = pc.math.random(0, this.obstacleArray.length);
    t = Math.floor(t);
    for (var a = 0; a < this.obstacleArray.length; a++)
      this.obstacleArray[a].enabled = !1;
    this.obstacleArray[t].enabled = !0;
  });
var ObstacleHit = pc.createScript("obstacleHit");
(ObstacleHit.prototype.initialize = function () {
  this.entity.collision.on("triggerenter", this.onTriggerEnter, this);
}),
  (ObstacleHit.prototype.update = function (t) {}),
  (ObstacleHit.prototype.onTriggerEnter = function (t) {
    console.log("Hit"),
      t.tags.has("player") &&
        ((this.manager =
          this.app.root.findByName("Gamemanager").script.gamemanager),
        this.manager.gameOver());
  });
var Gamemanager = pc.createScript("gamemanager");
Gamemanager.attributes.add("camera", {
  type: "entity",
  description: "Player camera",
}),
  Gamemanager.attributes.add("player", {
    type: "entity",
    description: "Player",
  }),
  Gamemanager.attributes.add("HomeUI", {
    type: "entity",
    description: "Player",
  }),
  Gamemanager.attributes.add("GameOverUI", {
    type: "entity",
    description: "Player",
  }),
  Gamemanager.attributes.add("GameUI", {
    type: "entity",
    description: "Player",
  }),
  Gamemanager.attributes.add("Restart", {
    type: "entity",
    description: "restart btn",
  }),
  Gamemanager.attributes.add("RestartWithNoInternet", {
    type: "entity",
    description: "restart btn",
  }),
  Gamemanager.attributes.add("Share", {
    type: "entity",
    description: "Share btn",
  }),
  Gamemanager.attributes.add("leaderBoardNoInternet", {
    type: "entity",
    description: "Leader Board No Internet",
  }),
  (Gamemanager.prototype.initialize = function () {
    (this.state = 0),
      (this.btnStart = this.HomeUI.findByName("Start")),
      this.btnStart.element.on(
        "click",
        function (e) {
          (this.state = 2), (this.gameOverDone = !1);
        },
        this
      ),
      (this.scorefinal = this.GameOverUI.findByName("player Score")),
      (this.timeFinal = this.GameOverUI.findByName("player time")),
      this.Restart.element.on(
        "click",
        function (e) {
          this.state = 4;
        },
        this
      ),
      this.RestartWithNoInternet.element.on(
        "click",
        function (e) {
          this.state = 4;
        },
        this
      ),
      this.Share.element.on(
        "click",
        function (e) {
          navigator.onLine
            ? firebaseControllerInstance.setNewScore(
                "InfinityRunner_VCC",
                this.gameScore,
                !0,
                firebaseControllerInstance.user,
                function () {
                  console.log("SCoreUpadted");
                },
                function (e) {
                  InfinityRunnerLeaderboardInstance.HideLeaderboard(),
                    (this.leaderBoardNoInternet.enabled = !0),
                    console.log("Error!!", e);
                }
              )
            : (InfinityRunnerLeaderboardInstance.HideLeaderboard(),
              (this.leaderBoardNoInternet.enabled = !0));
        },
        this
      ),
      (this.GameOverUI.enabled = !1),
      (this.scoreTxt = this.GameUI.findByName("score_txt")),
      (this.timeTxt = this.GameUI.findByName("time_txt")),
      (this.GameUI.enabled = !1),
      (this.gameStart = !1),
      (this.gameOverDone = !1),
      (this.gameScore = 0),
      (this.playTime = 60);
  }),
  (Gamemanager.prototype.update = function (e) {
    switch (this.state) {
      case 0:
        console.log("Home"),
          (this.gameScore = 0),
          this.HomeUI.enabled || (this.HomeUI.enabled = !0);
        break;
      case 1:
        console.log("Player");
        break;
      case 2:
        console.log("Game"),
          (this.GameUI.enabled = !0),
          (this.HomeUI.enabled = !1),
          (this.gameStart = !0),
          (this.playTime -= e),
          this.playTime <= 0 &&
            ((this.playTime = 0),
            (this.state = 3),
            console.log("switch to GameOver"),
            this.gameOverByTime()),
          (this.timeTxt.element.text = "" + this.getTimeInMMSS(this.playTime)),
          (this.scoreTxt.element.text = "" + this.gameScore);
        break;
      case 3:
        console.log("Game Over"),
          (this.scorefinal.element.text = "Score : " + this.gameScore),
          (this.timeFinal.element.text =
            "Time : " + this.getTimeInMMSS(this.playTime));
        break;
      case 4:
        console.log("Reset"),
          (this.camera.script.enabled = !0),
          (this.gameOverDone = !1),
          (this.gameStart = !0),
          this.player.script.playerController.resetPlayer(),
          this.camera.script.cameraMovement.resetCamera(),
          (this.state = 2),
          (this.HomeUI.enabled = !1),
          (this.leaderBoardNoInternet.enabled = !1),
          InfinityRunnerLeaderboardInstance.HideLeaderboard(),
          (this.GameUI.enabled = !1),
          (this.gameScore = 0),
          (this.playTime = 60);
    }
  }),
  (Gamemanager.prototype.isGameStarted = function () {
    return this.gameStart;
  }),
  (Gamemanager.prototype.gameOver = function () {
    console.log("Game Over");
    var e = this;
    if (!this.gameOverDone) {
      (this.gameOverDone = !0),
        this.camera.children[0].script.shakeCamera.shakeTheCamera(),
        (this.camera.script.enabled = !1),
        this.player.script.playerController.playerHited(),
        (this.state = 3);
      var t = this;
      this.entity.sound.play("Hit"),
        firebaseControllerInstance.setNewScore(
          "InfinityRunner_VCC",
          this.gameScore,
          !1,
          firebaseControllerInstance.user,
          function () {
            console.log("SCoreUpadted");
          },
          function (e) {
            console.log("Error!!", e);
          }
        ),
        setTimeout(function () {
          (t.GameUI.enabled = !1),
            navigator.onLine
              ? InfinityRunnerLeaderboardInstance.ShowLeaderboard()
              : (e.leaderBoardNoInternet.enabled = !0);
        }, 2500);
    }
  }),
  (Gamemanager.prototype.gameOverByTime = function () {
    console.log("Game Over");
    var e = this;
    if (!this.gameOverDone) {
      (this.gameStart = !1),
        (this.gameOverDone = !0),
        (this.camera.script.enabled = !1),
        this.player.script.playerController.timeout(),
        (this.state = 3);
      var t = this;
      firebaseControllerInstance.setNewScore(
        "InfinityRunner_VCC",
        this.gameScore,
        !1,
        firebaseControllerInstance.user,
        function () {
          console.log("SCoreUpadted");
        },
        function (e) {
          console.log("Error!!", e);
        }
      ),
        setTimeout(function () {
          (t.GameUI.enabled = !1),
            navigator.onLine
              ? InfinityRunnerLeaderboardInstance.ShowLeaderboard()
              : (e.leaderBoardNoInternet.enabled = !0);
        }, 100);
    }
  }),
  (Gamemanager.prototype.addScore = function () {
    this.gameScore++, this.entity.sound.play("Collect");
  }),
  (Gamemanager.prototype.getTimeInMMSS = function (e) {
    var t = Math.floor(e / 3600),
      a = Math.floor((e - 3600 * t) / 60),
      r = e - 3600 * t - 60 * a;
    r = Math.round(100 * r) / 100;
    var n = "" + a;
    a < 10 && (n = "0" + a);
    var i = "" + Math.floor(r);
    return Math.floor(r) < 10 && (i = "0" + Math.floor(r)), n + ":" + i;
  }),
  (Gamemanager.prototype.hello = function () {
    console.log("Hello Call");
  });
var TriggerVolume = pc.createScript("triggerVolume");
TriggerVolume.prototype.initialize = function () {
  this.entity.collision.on("triggerenter", function (e) {
    console.log(e.name + " has entered trigger volume.");
  }),
    this.entity.collision.on("triggerleave", function (e) {
      console.log(e.name + " has left trigger volume.");
    });
};
var PlayerController = pc.createScript("playerController");
(PlayerController.states = {
  idle: { animation: "Idle.json" },
  run: { animation: "Run Forward.json" },
  jump: { animation: "Falling Idle.json" },
  move: { animation: "Jump.json" },
  hit: { animation: "Hit On Legs.json" },
}),
  PlayerController.attributes.add("playerAnim", {
    type: "entity",
    description: "Player Animation",
  }),
  PlayerController.attributes.add("speed", {
    type: "number",
    default: 1,
    title: "Player running speed",
  }),
  PlayerController.attributes.add("playerMoveBody", {
    type: "entity",
    description: "This enity is moving forwared direction",
  }),
  PlayerController.attributes.add("jumpPlayer", {
    type: "entity",
    description: "Other temp object helping for get jump value",
  }),
  PlayerController.attributes.add("jumpPower", {
    type: "number",
    default: 0.1,
    title: "Time for force",
  }),
  PlayerController.attributes.add("hitOffset", {
    type: "number",
    default: 0.1,
    title: "Hit fallsback offset",
  }),
  PlayerController.attributes.add("hitEffect", { type: "entity" }),
  (PlayerController.prototype.initialize = function () {
    (this.blendTime = 0.5),
      this.setState("run"),
      (this._startingPostionOfBody = new pc.Vec3()),
      this._startingPostionOfBody.copy(this.playerMoveBody.getPosition()),
      (this._playerMovePosition = 0),
      (this.isPressed = !1),
      (this.firstPressPos = new pc.Vec2()),
      (this.secondPressPos = new pc.Vec2()),
      (this.currentSwipe = new pc.Vec2()),
      this.app.mouse &&
        (this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this)),
      this.app.touch &&
        (this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this),
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEndCancel, this),
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEndCancel, this),
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this)),
      this.jumpPlayer.collision.on(
        "collisionstart",
        this.onCollisionStart,
        this
      ),
      this.jumpPlayer.collision.on("collisionend ", this.onCollisionEnd, this),
      (this.isJumping = !1),
      (this.isGround = !0),
      (this.gameManager =
        this.app.root.findByName("Gamemanager").script.gamemanager),
      (this._tempJumpTime = this.jumpPower),
      (this._moveDistance = this._startingPostionOfBody.z),
      (this._didHeHited = !1),
      (this.alpha = 0),
      (this.start = 0),
      (this.end = 0),
      (this.runOnce = !1),
      (this.value = 0),
      (this._moveSpeed = 3),
      (this.isMoving = !1),
      (this.pitch = !1),
      (this.hitEffectcolone = null);
  }),
  (PlayerController.prototype.update = function (t) {
    if (this.gameManager.isGameStarted()) {
      if (this._didHeHited)
        return (
          "hit" != this.state &&
            ((this.blendTime = 0.1),
            (this.playerAnim.animation.loop = !1),
            this.setState("hit"),
            (this.hitEffectcolone = this.hitEffect.clone()),
            this.entity.addChild(this.hitEffectcolone),
            this.hitEffectcolone.setLocalPosition(
              this.hitEffect.getLocalPosition()
            ),
            (this.hitEffectcolone.enabled = !0),
            this.entity.sound.stop("walk")),
          this.entity.setLocalPosition(
            this.entity.getLocalPosition().x,
            this.jumpPlayer.getLocalPosition().y,
            this.entity.getLocalPosition().z
          ),
          void this.playerMoveBody.setPosition(
            this.playerMoveBody.getPosition().x,
            this.playerMoveBody.getPosition().y,
            this._moveDistance - this.hitOffset
          )
        );
      this.isJumping &&
        ((this._tempJumpTime -= 2e3 * t),
        this.jumpPlayer.rigidbody.applyImpulse(0, 5.4, 0),
        this._tempJumpTime < 0 &&
          ((this.isJumping = !1),
          (this.isGround = !1),
          (this._tempJumpTime = this.jumpPower))),
        this.isGround
          ? "run" == this.state ||
            this.isMoving ||
            ((this.blendTime = 0.2),
            this.setState("run"),
            this.entity.sound.play("walk"))
          : "jump" != this.state &&
            ((this.blendTime = 0.5),
            this.setState("jump"),
            this.entity.sound.stop("walk")),
        "run" == this.state ||
          (this.entity.sound.play("walk"),
          this.pitch
            ? ((this.pitch = !this.pitch),
              (this.entity.sound.play("walk").pitch = 1))
            : ((this.pitch = !this.pitch),
              (this.entity.sound.play("walk").pitch = 1.2)));
      var i = this.app;
      switch (
        (i.keyboard.isPressed(pc.KEY_LEFT) &&
          i.keyboard.wasPressed(pc.KEY_LEFT) &&
          ((this._playerMovePosition = this._playerMovePosition + 1),
          this._playerMovePosition > 1 && (this._playerMovePosition = 1),
          (this.runOnce = !1),
          this.isGround &&
            "run" == this.state &&
            ((this.blendTime = 0.2), this.setState("move"))),
        i.keyboard.isPressed(pc.KEY_RIGHT) &&
          i.keyboard.wasPressed(pc.KEY_RIGHT) &&
          ((this._playerMovePosition = this._playerMovePosition - 1),
          this._playerMovePosition < -1 && (this._playerMovePosition = -1),
          (this.runOnce = !1),
          this.isGround &&
            "run" == this.state &&
            ((this.blendTime = 0.2), this.setState("move"))),
        (i.keyboard.isPressed(pc.KEY_UP) || i.keyboard.isPressed(pc.KEY_W)) &&
          this.isGround &&
          (this.entity.sound.play("Jump"), (this.isJumping = !0)),
        this._playerMovePosition)
      ) {
        case 1:
          this.runOnce ||
            ((this.runOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = 1.5),
            (this.isMoving = !0)),
            (this.alpha += this._moveSpeed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          var e = this.end - this.value;
          (this.value === this.end || e < 0.001) && (this.isMoving = !1);
        case -1:
          this.runOnce ||
            ((this.runOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = -1.5),
            (this.isMoving = !0)),
            (this.alpha += this._moveSpeed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          e = this.end - this.value;
          (this.value === this.end || e < 0.001) && (this.isMoving = !1);
        case 0:
          this.runOnce ||
            ((this.runOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = 0)),
            (this.alpha += this._moveSpeed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          e = this.end - this.value;
          this.value, this.end;
      }
      this.entity.setLocalPosition(
        this.value,
        this.jumpPlayer.getLocalPosition().y,
        this.entity.getLocalPosition().z
      ),
        (this._moveDistance += t * this.speed),
        this.playerMoveBody.setPosition(
          this.playerMoveBody.getPosition().x,
          this.playerMoveBody.getPosition().y,
          this._moveDistance
        );
    } else
      "idle" != this.state && ((this.blendTime = 0.5), this.setState("idle"));
  }),
  (PlayerController.prototype.setState = function (t) {
    var i = PlayerController.states;
    (this.state = t),
      this.playerAnim.animation.play(i[t].animation, this.blendTime);
  }),
  (PlayerController.prototype.onCollisionStart = function (t) {
    t.other.rigidbody && (this.isGround = !0);
  }),
  (PlayerController.prototype.onCollisionEnd = function (t) {
    t.other.rigidbody && (this.isGround = !1);
  }),
  (PlayerController.prototype.onMouseDown = function (t) {
    (this.isPressed = !0), (this.firstPressPos = new pc.Vec2(t.x, t.y));
  }),
  (PlayerController.prototype.onMouseUp = function (t) {
    (this.isPressed = !1),
      (this.secondPressPos = new pc.Vec2(t.x, t.y)),
      this.getSwipeDirection();
  }),
  (PlayerController.prototype.onTouchStart = function (t) {
    1 == t.touches.length &&
      ((this.isPressed = !0),
      (this.firstPressPos = new pc.Vec2(t.touches[0].x, t.touches[0].y)));
  }),
  (PlayerController.prototype.onTouchMove = function (t) {
    this.secondPressPos = new pc.Vec2(t.touches[0].x, t.touches[0].y);
  }),
  (PlayerController.prototype.onTouchEndCancel = function (t) {
    0 === t.touches.length && ((this.isPressed = !1), this.getSwipeDirection());
  }),
  (PlayerController.prototype.getSwipeDirection = function () {
    this.gameManager.isGameStarted() &&
      ((this.currentSwipe = new pc.Vec2(
        this.secondPressPos.x - this.firstPressPos.x,
        this.secondPressPos.y - this.firstPressPos.y
      )),
      this.currentSwipe.normalize(),
      this.currentSwipe.y > 0 &&
        this.currentSwipe.x > -0.5 &&
        this.currentSwipe.x < 0.5 &&
        console.log("Swipe Down"),
      this.currentSwipe.y < 0 &&
        this.currentSwipe.x > -0.5 &&
        this.currentSwipe.x < 0.5 &&
        (console.log("Swipe Up"),
        this.isGround &&
          (this.entity.sound.play("Jump"), (this.isJumping = !0))),
      this.currentSwipe.x < 0 &&
        this.currentSwipe.y > -0.5 &&
        this.currentSwipe.y < 0.5 &&
        (console.log("Swipe Left"),
        (this._playerMovePosition = this._playerMovePosition + 1),
        this._playerMovePosition > 1 && (this._playerMovePosition = 1),
        (this.runOnce = !1),
        this.isGround &&
          "run" == this.state &&
          ((this.blendTime = 0.2), this.setState("move"))),
      this.currentSwipe.x > 0 &&
        this.currentSwipe.y > -0.5 &&
        this.currentSwipe.y < 0.5 &&
        (console.log("Swipe Right"),
        (this._playerMovePosition = this._playerMovePosition - 1),
        this._playerMovePosition < -1 && (this._playerMovePosition = -1),
        (this.runOnce = !1),
        this.isGround &&
          "run" == this.state &&
          ((this.blendTime = 0.2), this.setState("move"))));
  }),
  (PlayerController.prototype.resetPlayer = function () {
    (this.blendTime = 0.01),
      this.setState("idle"),
      (this._playerMovePosition = 0),
      (this.isPressed = !1),
      (this.firstPressPos = new pc.Vec2()),
      (this.secondPressPos = new pc.Vec2()),
      (this.currentSwipe = new pc.Vec2()),
      (this.jump = !1),
      (this.isGround = !0),
      (this._tempJumpTime = this.jumpPower),
      this.playerMoveBody.setPosition(this._startingPostionOfBody),
      (this._moveDistance = this._startingPostionOfBody.z),
      (this._didHeHited = !1),
      this.hitEffectcolone && this.hitEffectcolone.destroy(),
      (this.alpha = 0),
      (this.start = 0),
      (this.end = 0),
      (this.runOnce = !1),
      (this.value = 0),
      (this.playerAnim.animation.loop = !0);
  }),
  (PlayerController.prototype.playerHited = function () {
    this._didHeHited = !0;
  }),
  (PlayerController.prototype.timeout = function () {
    this.entity.sound.stop("walk");
  });
var LearpApp = pc.createScript("learpApp");
(LearpApp.prototype.initialize = function () {
  (this.alpha = 0), (this.start = 34), (this.end = 10);
}),
  (LearpApp.prototype.update = function (p) {
    this.alpha += 0.2 * p;
    var t = pc.math.lerp(this.start, this.end, this.alpha);
    console.log(t);
  });
var ShakeCamera = pc.createScript("shakeCamera");
(ShakeCamera.prototype.initialize = function () {
  (this.alpha = 0),
    (this.start = 0),
    (this.end = 0.5),
    (this.state = 0),
    (this.doOnce = !1),
    (this.speed = 0),
    (this.value = 0),
    (this.loop = 4),
    (this.loopCount = 0),
    (this.startShake = !1);
}),
  (ShakeCamera.prototype.update = function (t) {
    if (this.startShake) {
      switch (this.state) {
        case 0:
          this.doOnce ||
            ((this.doOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = 0.5),
            (this.speed = 12)),
            (this.alpha += this.speed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          var s = this.end - this.value;
          (this.value === this.end || s < 0.001) &&
            ((this.doOnce = !1), (this.state = 1));
          break;
        case 1:
          this.doOnce ||
            ((this.doOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = -0.5),
            (this.speed = 12)),
            (this.alpha += this.speed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          s = this.end - this.value;
          (this.value === this.end || s < 0.001) &&
            ((this.doOnce = !1), (this.state = 2));
          break;
        case 2:
          this.doOnce ||
            ((this.doOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = 0.4),
            (this.speed = 12)),
            (this.alpha += this.speed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          s = this.end - this.value;
          (this.value === this.end || s < 0.001) &&
            ((this.doOnce = !1), (this.state = 3));
          break;
        case 3:
          this.doOnce ||
            ((this.doOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = -0.3),
            (this.speed = 12)),
            (this.alpha += this.speed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          s = this.end - this.value;
          (this.value === this.end || s < 0.001) &&
            ((this.doOnce = !1), (this.state = 4));
          break;
        case 4:
          this.doOnce ||
            ((this.doOnce = !0),
            (this.alpha = 0),
            (this.start = this.value),
            (this.end = 0),
            (this.speed = 12)),
            (this.alpha += this.speed * t),
            (this.value = pc.math.lerp(this.start, this.end, this.alpha));
          s = this.end - this.value;
          (this.value === this.end || s < 0.001) &&
            ((this.doOnce = !1),
            this.loopCount == this.loop ? (this.state = 5) : this.loopCount++);
          break;
        case 5:
          this.startShake = !1;
      }
      this.entity.setLocalPosition(
        this.value,
        this.entity.getLocalPosition().y,
        this.entity.getLocalPosition().z
      );
    }
  }),
  (ShakeCamera.prototype.shakeTheCamera = function () {
    (this.alpha = 0),
      (this.start = 0),
      (this.end = 0.5),
      (this.state = 0),
      (this.doOnce = !1),
      (this.speed = 0),
      (this.value = 0),
      (this.loop = 2),
      (this.loopCount = 0),
      (this.startShake = !0);
  });
var Collectable = pc.createScript("collectable");
(Collectable.prototype.initialize = function () {
  this.entity.collision.on("triggerenter", this.onTriggerEnter, this),
    (this.manager = this.app.root.findByName("Gamemanager").script.gamemanager);
}),
  (Collectable.prototype.update = function (e) {}),
  (Collectable.prototype.onTriggerEnter = function (e) {
    e.tags.has("player") &&
      (this.manager.addScore(), (this.entity.enabled = !1)),
      e.tags.has("GameOver") &&
        (console.log("In Obstracle"), (this.entity.enabled = !1));
  });
var CollectableRefresh = pc.createScript("collectableRefresh");
(CollectableRefresh.prototype.initialize = function () {
  this.obstacleArray = [];
  for (var e = 0; e < this.entity.children.length; e++)
    this.obstacleArray.push(this.entity.children[e]);
}),
  (CollectableRefresh.prototype.update = function (e) {}),
  (CollectableRefresh.prototype.updateCollection = function () {
    var e = pc.math.random(0, this.obstacleArray.length);
    e = Math.floor(e);
    for (var t = 0; t < this.obstacleArray.length; t++)
      this.obstacleArray[t].enabled = !1;
    this.obstacleArray[e].enabled = !0;
  });
var EnableAllCollection = pc.createScript("enableAllCollection");
(EnableAllCollection.prototype.initialize = function () {
  this.obstacleArray = [];
  for (var l = 0; l < this.entity.children.length; l++)
    this.obstacleArray.push(this.entity.children[l]);
}),
  (EnableAllCollection.prototype.updateAll = function () {
    for (var l = 0; l < this.obstacleArray.length; l++)
      this.obstacleArray[l].enabled = !0;
  });
var LoadUrlbutton = pc.createScript("loadUrlbutton");
LoadUrlbutton.attributes.add("url", {
  type: "string",
  title: "URL",
  default: "https://expo.djvirtualevents.com/lobby",
}),
  (LoadUrlbutton.prototype.initialize = function () {
    this.entity.element.on("click", this.onClick, this);
  }),
  (LoadUrlbutton.prototype.update = function (t) {}),
  (LoadUrlbutton.prototype.onClick = function (t) {
    window.open(this.url);
  });
pc.script.createLoadingScreen(function (e) {
  var t, a;
  (t = [
    "body {",
    "    background-color: #283538;",
    "}",
    "#application-splash-wrapper {",
    "    position: absolute;",
    "    top: 0;",
    "    left: 0;",
    "    height: 100%;",
    "    width: 100%;",
    "    background-color: #283538;",
    "}",
    "#application-splash {",
    "    position: absolute;",
    "    top: calc(50% - 28px);",
    "    width: 264px;",
    "    left: calc(50% - 132px);",
    "}",
    "#application-splash img {",
    "    width: 100%;",
    "}",
    "#progress-bar-container {",
    "    margin: 20px auto 0 auto;",
    "    height: 2px;",
    "    width: 100%;",
    "    background-color: #1d292c;",
    "}",
    "#progress-bar {",
    "    width: 0%;",
    "    height: 100%;",
    "    background-color: #f60;",
    "}",
    "@media (max-width: 480px) {",
    "    #application-splash {",
    "        width: 170px;",
    "        left: calc(50% - 85px);",
    "    }",
    "}",
  ].join("\n")),
    ((a = document.createElement("style")).type = "text/css"),
    a.styleSheet
      ? (a.styleSheet.cssText = t)
      : a.appendChild(document.createTextNode(t)),
    document.head.appendChild(a),
    (function () {
      var e = document.createElement("div");
      (e.id = "application-splash-wrapper"), document.body.appendChild(e);
      var t = document.createElement("div");
      (t.id = "application-splash"),
        e.appendChild(t),
        (t.style.display = "none");
      var a = document.createElement("img");
      (a.src = "assets/images/logo_filp.png"),
        t.appendChild(a),
        (a.onload = function () {
          t.style.display = "block";
        });
      var o = document.createElement("div");
      (o.id = "progress-bar-container"), t.appendChild(o);
      var n = document.createElement("div");
      (n.id = "progress-bar"), o.appendChild(n);
    })(),
    e.on("preload:end", function () {
      e.off("preload:progress");
    }),
    e.on("preload:progress", function (e) {
      var t = document.getElementById("progress-bar");
      t && ((e = Math.min(1, Math.max(0, e))), (t.style.width = 100 * e + "%"));
    }),
    e.on("start", function () {
      var e = document.getElementById("application-splash-wrapper");
      e.parentElement.removeChild(e);
    });
});
var Hello = pc.createScript("hello");
(Hello.prototype.initialize = function () {}),
  (Hello.prototype.update = function (e) {});
var Instructions = pc.createScript("instructions");
Instructions.attributes.add("speed", { type: "number" }),
  Instructions.attributes.add("Start", { type: "entity" }),
  Instructions.attributes.add("textures", {
    type: "asset",
    assetType: "texture",
    array: !0,
  }),
  (Instructions.prototype.initialize = function () {
    var t = this;
    (this.id = 0),
      (this.Start.enabled = !1),
      setInterval(function () {
        var e = t.textures[t.id].resource;
        (t.entity.element.texture = e),
          t.entity.element.texture.upload(),
          t.id++,
          t.id >= t.textures.length && ((t.id = 0), (t.Start.enabled = !0));
      }, 1e3 * t.speed);
  }),
  (Instructions.prototype.update = function (t) {});
var Spin = pc.createScript("spin");
(Spin.prototype.initialize = function () {
  this.speed = 130;
}),
  (Spin.prototype.update = function (t) {
    this.entity.rotate(0, t * this.speed, 0);
  });
var InfinityRunnerLeaderboardInstance,
  Leaderboard = pc.createScript("leaderboard");
Leaderboard.attributes.add("gameName", { type: "string" }),
  Leaderboard.attributes.add("listSize", { type: "number", default: 10 }),
  Leaderboard.attributes.add("template", { type: "entity" }),
  Leaderboard.attributes.add("personal", { type: "entity" }),
  Leaderboard.attributes.add("leaderboard", { type: "entity" }),
  Leaderboard.attributes.add("mainDisplay", { type: "entity" }),
  Leaderboard.attributes.add("errorDisplay", { type: "entity" }),
  Leaderboard.attributes.add("firstLeaderPositionY", { type: "number" }),
  Leaderboard.attributes.add("leaderPositionGap", { type: "number" }),
  Leaderboard.attributes.add("openLeaderboardByDefault", { type: "boolean" }),
  (Leaderboard.prototype.initialize = function () {
    var e = this;
    (this.entries = []),
      e.clear(),
      (InfinityRunnerLeaderboardInstance = this),
      (this.isShowing = !1),
      this.openLeaderboardByDefault
        ? this.app.on("firebaseInit", function () {
            e.ShowLeaderboard();
          })
        : (this.leaderboard.enabled = !1);
  }),
  (Leaderboard.prototype.clear = function () {
    for (var e = 0; e < this.entries.length; e++) this.entries[e].destroy();
    this.entries = [];
  }),
  (Leaderboard.prototype.addEntry = function (e, a, r, t, d) {
    var i = this.template.clone();
    (i.enabled = !0),
      (i.findByName("Name").element.text = r ? r.toUpperCase() : ""),
      (i.findByName("Score").element.text = t.toString()),
      d && (i.findByName("background").enabled = !1),
      this.entries.push(i),
      e.addChild(i),
      i.translateLocal(0, a, 0);
  }),
  (Leaderboard.prototype.ShowLeaderboard = function () {
    var e = this;
    (this.isShowing = !0), (this.leaderboard.enabled = !0);
    var a = !1;
    firebaseControllerInstance.db
      .collection(e.gameName)
      .doc(firebaseControllerInstance.user.uid)
      .get()
      .then(function (a) {
        a.exists &&
          ((e.errorDisplay.enabled = !1),
          (e.mainDisplay.enabled = !0),
          (e.personal.element.text = a.data().score));
      })
      .catch(function (r) {
        (a = !0),
          (e.errorDisplay.enabled = !0),
          (e.mainDisplay.enabled = !1),
          console.log(r);
      }),
      a ||
        (e.LeaderboardFirebaseListener = firebaseControllerInstance.db
          .collection(e.gameName)
          .orderBy("score", "desc")
          .limit(e.listSize)
          .onSnapshot(
            function (a) {
              a.docs;
              var r = [];
              a.forEach(function (e) {
                r.push(e.data());
              }),
                e.clear(),
                (e.errorDisplay.enabled = !1),
                (e.mainDisplay.enabled = !0);
              for (
                var t = e.firstLeaderPositionY, d = 0;
                d < Math.min(r.length, 10);
                d++
              ) {
                var i = !0;
                d % 2 == 0 && (i = !1),
                  console.log(r[d]),
                  e.addEntry(e.mainDisplay, t, r[d].name, r[d].score, i),
                  (t -= e.leaderPositionGap);
              }
            },
            function (a) {
              (e.errorDisplay.enabled = !0),
                (e.mainDisplay.enabled = !1),
                console.log(a);
            }
          ));
  }),
  (Leaderboard.prototype.HideLeaderboard = function () {
    (this.isShowing = !1),
      (this.leaderboard.enabled = !1),
      this.LeaderboardFirebaseListener && this.LeaderboardFirebaseListener();
  });
var firebaseControllerInstance,
  FirebaseController = pc.createScript("firebaseController");
(FirebaseController.prototype.initialize = function () {
  var e = this;
  (firebaseControllerInstance = this),
    this.initializeFirebase(),
    this.auth.onAuthStateChanged(function (o) {
      o
        ? (console.log(o.email + " is logged"),
          (firebaseControllerInstance.user = o),
          e.app.fire("firebaseInit"))
        : (console.log("No user is logged in"),
          firebaseControllerInstance.login(
            "shubham@dj.com",
            "shubham@dj.com123456"
          ));
    });
}),
  (FirebaseController.prototype.update = function (e) {}),
  (FirebaseController.prototype.initializeFirebase = function () {
    firebase.initializeApp({
      apiKey: "AIzaSyCs6NzzHFwuOywcjKb6weU2tnblFOJYQJQ",
      authDomain: "optum-cdcd7.firebaseapp.com",
      databaseURL: "https://optum-cdcd7-default-rtdb.firebaseio.com",
      projectId: "optum-cdcd7",
      storageBucket: "optum-cdcd7.appspot.com",
      messagingSenderId: "33244416026",
      appId: "1:33244416026:web:cd039c460016444059a9a3",
      measurementId: "G-ZR8NLSNB91",
    }),
      (this.db = firebase.firestore()),
      (this.auth = firebase.auth());
  }),
  (FirebaseController.prototype.login = function (e, o) {
    this.auth
      .signInWithEmailAndPassword(e, o)
      .then(function (e) {
        console.log(e.user.email + " is logged in right now");
      })
      .catch(function (e) {
        var o = e.code,
          t = e.message;
        console.log("code: " + o + " & ErrorMsg: " + t);
      });
  }),
  (FirebaseController.prototype.logout = function () {
    this.auth
      .signOut()
      .then(function () {
        console.log("user signed out");
      })
      .catch(function (e) {
        console.log("error happened while signing out");
      });
  }),
  (FirebaseController.prototype.randomNewScore = function () {
    var e = Math.floor(100 * Math.random());
    console.log(e),
      firebaseControllerInstance.setNewScore(
        "InfinityRunner_VCC",
        e,
        !1,
        firebaseControllerInstance.user,
        function () {
          console.log("SCoreUpadted");
        },
        function (e) {
          console.log("Error!!", e);
        }
      );
  }),
  (FirebaseController.prototype.setNewScore = function (e, o, t, n, r, i) {
    if (n) {
      var a = {
          id: n.uid,
          name: n.displayName
            ? n.displayName
            : n.email
            ? n.email.split("@")[0]
            : n.uid,
          score: o,
          isShare: t,
        },
        s = firebaseControllerInstance.db.collection(e).doc(n.uid);
      return firebaseControllerInstance.db
        .runTransaction(function (e) {
          return e.get(s).then(function (o) {
            if (o.exists) {
              if (!(o.data().score < a.score)) return;
              e.update(s, a);
            } else e.set(s, a);
          });
        })
        .then(function () {
          console.log("Transaction successfully committed!"), r && r();
        })
        .catch(function (e) {
          console.log("Transaction failed: ", e), i && i(e);
        });
    }
    console.log("error  in getting user data!!");
  }),
  (FirebaseController.prototype.setShare = function (e, o, t, n, r) {
    t
      ? firebaseControllerInstance.db
          .collection(e)
          .doc(t.uid)
          .update({ isShare: o })
          .then(function () {
            n && n();
          })
          .catch(function (e) {
            r && r(e);
          })
      : console.log("error  in getting user data!!");
  }),
  (FirebaseController.prototype.getScore = function (e, o, t, n) {
    firebaseControllerInstance.db
      .collection(e)
      .orderBy("score", "desc")
      .limit(o)
      .get()
      .then(function (e) {
        console.log(e);
        e.docs;
        var o = [];
        e.forEach(function (e) {
          o.push(e.data());
        }),
          t && t(o);
      })
      .catch(function (e) {
        n && n(e);
      });
  }),
  (FirebaseController.prototype.getUserTopScore = function (e, o, t) {
    firebaseControllerInstance.db
      .collection(e)
      .doc(firebaseControllerInstance.user.uid)
      .get()
      .then(function (e) {
        e.exists && o && o(e.data());
      })
      .catch(function (e) {
        t && t(e);
      });
  });
