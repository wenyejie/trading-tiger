/**
 * im 核心方法
 *
 * readyState
 * CONNECTING  0  连接还没开启。OPEN  1  连接已开启并准备好进行通信。CLOSING  2  连接正在关闭的过程中。CLOSED  3  连接已经关闭，或者连接无法建立。
 *
 * error
 * -1: UNSUPPORT, 3
 *
 * author: Storm
 * date: 2017/05/06
 */

/**
 * @param ctime 创建时间
 * @param event: 事件类型
 * 1：文本，2：图文，3：增加会话，4：监听在线状态
 *
 * @param event_context: 事件内容
 * pic: 图片，字符串逗号分隔
 * content: 文本
 * state: 是否在线 online/offline
 * buyer: 买家ID
 * seller: 卖家ID
 *
 * @param id: im id
 * @param sendRoleType: 发送者角色 "seller/buyer/deliverCustomer"
 * @param sender: 发送者uid
 * @param sessionGroup: 会话组
 * @type {{}}
 */
let options = {

  // 命令
  command: 'chat',

  // 头部
  headers: null,
};

var messageQueue = [];

var reconnectionCount = 1;

// 是否为用户主动关闭链接
var userClose = false;

function iMessage (url) {
  let _this = this;
  _this.conn = new WebSocket(url);

  // 设置im选项
  _this.setOptions = function (opts) {
    options = opts;
  };

  _this.remove = function () {
    userClose = true;
    _this.conn.close();
  };

  //client interface
  _this.on_open = function (c) {
  };
  _this.on_message = function (c) {
  };
  _this.on_close = function (c) {
  };
  _this.on_error = function (c) {
  };

  /**
   * web socket 初始化
   */
  _this.init = function () {
    _this.conn = new WebSocket(url);

    _this.conn.onclose = function (evt) {
      if (!userClose) _this.reconnect();
      var c = new Context(_this.conn, evt.data);
      _this.on_close(c);
    };
    _this.conn.onopen = function () {
      reconnectionCount = 1;

      // 断线重连之后, 重新发送之前的消息
      messageQueue.forEach(function (item) {
        if (item.resp === undefined || item.resp.encode === undefined) return false;
        _this.conn.send(item.resp.encode());
      });

      var c = new Context(_this.conn, null);
      _this.on_open(c);
    };
    _this.conn.onmessage = function (evt) {
      var c = new Context(_this.conn, evt.data);
      if (evt.data.indexOf('SDH/1.0 auth') >= 0 || evt.data.indexOf('SDH/1.0 ping') >= 0) return false;
      _this.on_message(c);
    };
    _this.conn.onerror = function (evt) {
      if (!userClose) _this.reconnect();
      var c = new Context(_this.conn, evt.data);
      _this.on_error(c, evt);
    };
    _this.context = new Context(_this.conn, null, _this);
  };

  /**
   * 断线重连
   */
  _this.reconnect = function () {
    if (reconnectionCount === 1) _this.lostConnection && _this.lostConnection();

    setTimeout(function () {
      reconnectionCount++;
      _this.conn.close();
      _this.init();
    }, Math.pow(2, reconnectionCount) * 250);
  };

  /**
   * 断网重连
   */
  _this.offlineReconnect = function () {
    _this.offline && _this.offline();
  };

  window.addEventListener('online', function () {
    _this.conn.close();
    _this.init();
  });

  _this.init();
}

let HEADER_KEY_PUBLISH = "publish";
let HEADER_KEY_SUBSCRIBE = "subscribe";

function Context (conn, message, $message) {
  let _this = this;
  _this.conn = conn;
  _this.req = new Message(message);
  _this.resp = new Message("");
  //_this.upstreamURL = "";
  _this.multiparts = [];
  //_this.upstreamURL = "POST " + location.protocol + CONFIG.IM_RECORD + "/h5/im/record" + "\r\n";

  _this.setCommand = function (str) {
    _this.resp.command = str;
  };

  _this.getCommand = function () {
    return _this.req.command;
  };

  _this.getHeader = function () {
    return _this.req.headers;
  };

  _this.addHeader = function (key, value) {
    _this.resp.headers[key] = value;
  };

  _this.getBody = function () {
    return _this.req.body;
  };

  _this.send = function (body) {
    _this.resp.body = body;
    if (_this.resp.command === "") {
      _this.resp.command = _this.req.command;
    }
    if (_this.resp.headers === {}) {
      _this.resp.headers = _this.req.headers;
    }

    if (_this.resp === undefined || _this.resp.encode === undefined) return false;

    if (!navigator.onLine) {
      messageQueue.push(_this.resp.encode());
      if (!userClose) $message.offlineReconnect();
      return false;
    }

    if (_this.conn.readyState !== 1) {
      messageQueue.push(_this.resp.encode());
      if (!userClose) $message.reconnect();
      return false;
    }

    // 正在连接中
    if (_this.conn.readyState === 0) {
      messageQueue.push(_this.resp.encode());
      return false;
    }

    _this.conn.send(_this.resp.encode());

  };

  _this.getMultipart = function () {
    return _this.multiparts;
  };

  _this.appendPart = function (headers, body) {

  };

  function assembleMessage (channel, command, headers, body) {
    _this.setCommand(command);

    for (let h in headers) {
      _this.addHeader(h, headers[h]);
    }

    _this.send(body);
  }

  _this.publish = function (channel, command, headers, body) {

    _this.addHeader(HEADER_KEY_PUBLISH, channel);

    //add upstream
    // _this.addHeader(HEADER_KEY_UPSTREAM, _this.upstreamURL);

    assembleMessage(channel, command, headers, body);
  };

  /**
   * 发送初始化
   * @param event 事件
   * @param context 会话内容
   */
  _this.publishInit = function (event, context) {

    var obj = {
      event: event + '',
      event_context: context,
      sendRoleType: options.sendRoleType,
      sender: options.sender + '',
      sessionGroup: options.sessionGroup
    };

    _this.publish(options.channel, 'chat', null, JSON.stringify(obj));
  };

  /**
   * 发送文本
   * @param body 内容
   */
  _this.publishText = function (body) {

    _this.publishInit(1, {
      content: body,
      orderId: options.orderId
    });
  };

  /**
   * 发送图文
   * @param channel 频道
   * @param body 内容
   */
  _this.publishImgText = function (channel, body) {
    _this.publish(channel, 2, {content: body});
  };

  _this.subscribe = function (channel, command, headers, body) {
    _this.addHeader(HEADER_KEY_SUBSCRIBE, channel);
    assembleMessage(channel, command, headers, body);
  }
}

let PROTOCOL_AND_VER = "SDH/1.0";

function Message (message) {
  let _this = this;
  _this.rawMessage = message;
  _this.command = "";
  _this.headers = {};
  _this.body = "";

  _this.decode = function () {
    let array = _this.rawMessage.split("\r\n\r\n");
    let command_and_headers = array[0];
    _this.body = array[1];

    let slice = command_and_headers.split("\r\n");
    _this.command = slice[0].slice(PROTOCOL_AND_VER.length + 1);

    let k, v;
    let temp;
    for (let i = 1; i < slice.length; i++) {
      temp = slice[i].split(":");
      k = temp[0];
      v = temp[1];


      _this.headers[k] = v;
    }
  };

  _this.encode = function () {
    let msg = PROTOCOL_AND_VER + " " + _this.command + "\r\n";
    for (let h in _this.headers) {
      msg += h + ":" + _this.headers[h] + "\r\n";
    }
    msg += "\r\n" + _this.body;


    return msg;
  };

  if (message && message.startsWith(PROTOCOL_AND_VER)) {
    _this.decode();
  }
}

let m = new Message("SDH/1.0 command\r\nh1:v1\r\nh2:v2\r\n\r\nbody");
m.encode();


export default iMessage;
