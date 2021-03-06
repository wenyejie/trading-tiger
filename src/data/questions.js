/**
 *常见问题数据集
 *
 * @param role 1: buyer, 2: seller
 *
 * author: 张潇
 * date: 2017/6/14
 */

export default {
  /**
   * 所有问题数据
   */
  all: [
    {
      id: 1,
      role: 1,
      title: '我已支付，多久才能取货？',
      answer: '<p>正常情况下，客服会在买家支付成功后的30分钟内联系您进行发货。</p><p>发货前我们的客服会通过交易虎网站内的聊天系统尝试联系您，若您没有回应，客服会拨打您的电话或短信通知您回来配合取货，所以不需要您一直盯着聊天界面等客服，您只需留意短信或电话即可。</p><p>若卖家不在线无法交易、或者部分游戏交易量过多临时爆单、或者游戏服务器正在维护、或者游戏出现故障无法登陆、或者遭遇了不可抗拒的因素（办公楼忽然停电、地震、网络被攻击）等特殊情况，会导致发货延期，延期时间视情况而定，也请您不要一直催促，多多谅解！待问题解决后会第一时间为您发货！</p>',
      related: [3, 4, 5]
    },
    {
      id: 2,
      role: 1,
      title: '我是买家，催发货',
      answer: '<p>亲，很抱歉让您久等了~！</p><p>正常情况下，客服会在买家支付成功后的30分钟内联系您进行发货，在此期间请不要一直催促客服，客服们是一对多为大家服务的哦，太忙的时候可能无法及时回复您，希望您能够理解！</p><p>若超过这个时间客服仍没有给您发货，有可能是因为：卖家不在线无法进行交易、或者部分游戏交易量过多临时爆单、或者游戏服务器正在维护、或者游戏出现故障无法登陆、或者遭遇了不可抗拒的因素（办公楼忽然停电、地震、网络被攻击）等特殊情况，会导致发货延期，延期时间视情况而定，也请您不要一直催促，多多谅解！待问题解决后会第一时间为您发货！</p><p>发货前我们的客服会通过交易虎网站内的聊天系统尝试联系您，若您没有回应，客服会拨打您的电话或短信通知您回来配合取货，所以不需要您一直盯着聊天界面等客服，您只需留意短信或电话即可。</p>',
      related: [3, 4, 5]
    }
    ,
    {
      id: 3,
      role: 1,
      title: '我是买家，怎样联系发货客服？',
      answer: '<p>登录交易虎（www.jiaoyihu.com），进入您的个人中心，然后找到“买家管理->待发货”的订单列表，点击【联系发货客服】按钮，即可联系到发货客服。</p><p>由于每笔订单的发货客服不是同一个人，若您有多个待发货的订单，请根据订单分开联系每个发货客服。</p><p>防骗提示：交易虎不会使用任何站外的方式联系您（如QQ、微信、贴吧、微博、邮箱等），短信和电话也仅仅会通知您回到交易虎网站联系我们，不会向您索要账号密码，更不会让您以任何名义转账或去其他网站购买商品，谨防上当受骗！！！</p>',
      related: [4, 5]
    }
    ,
    {
      id: 4,
      role: 1,
      title: '我不想买了，如何取消订单？',
      answer: '<p>只有待发货状态的订单才可以申请取消，其他状态都不能取消购买哦！您可以点击【联系发货客服】的按钮，告知客服您想取消当前订单，等待客服为您取消。</p><p>以下待发货的订单也无法取消哦：<ol><li>1、账号类商品，验完号之后，您已再次确认要购买的</li> <li>2、账号类商品，客服正在为您换绑、或已经换绑了部分密保的</li> <li>3、客服已完成发货的</li></ol></p>',
      related: [6, 9, 15]
    }
    ,
    {
      id: 5,
      role: 1,
      title: '购买商品要收手续费、服务费之类的费用吗？',
      answer: '<p>目前交易虎的交易服务费为0，提现也免费，也不收取其他任何费用。</p><p>提醒：不论是谁通过什么渠道向你索取“手续费、服务费、保证金、保险金”等各种名目的钱，或者要求您转账汇款，绝对都是骗子，请勿上当受骗！！！</p>',
      related: []
    }/*,

    {
      id: 5,
      role: 1,
      title: '购买商品要收手续费、服务费之类的费用吗？',
      answer: '<p>目前交易虎的交易服务费为0，也不收取其他任何费用。</p><p>只有在您申请账户余额提现时，支付宝会收取2%的提现费，该笔款项由支付宝直接扣除，不需要您进行任何操作。</p><p>提醒：不论是谁通过什么渠道向你索取“手续费、服务费、保证金、保险金”等各种名目的钱，或者要求您转账汇款，绝对都是骗子，请勿上当受骗！！！</p>',
      related: []
    }*/
    ,
    {
      id: 6,
      role: 1,
      title: '发货完成之后，可以退货吗？',
      answer: '<p>一旦发货完成是不可以退货的，请您在客服发货时仔细核对商品是否正确无误。</p><p>游戏币、道具、账号类商品，如果出现发错、漏发的情况，请联系我们进行登记核实，若属实，会将商品补发给您，或根据实际情况按比例退款。</p><p>若您购买的账号被卖家恶意找回，请您点击“个人中心->买家管理->待确认收货”列表页的【申请仲裁】按钮进行仲裁，若仲裁交易失败，货款会退给您。</p><p>但是已经超过了“待买家确认时间”的订单，由于货款已经转账给了卖家，则无法进行仲裁，也无法追回货款。交易虎平台可以为您提供一份【交易证明】，您可以凭此向游戏运营商提起申诉，但游戏账号的最终的归属权是由游戏运营商来判定。</p><p>账号交易存在一定的风险，交易虎平台只保障发货及待确认收货时间的商品安全，无法提供永久的售后，请您悉知！</p>',
      related: [15]
    }
    ,
    {
      id: 7,
      role: 1,
      title: '我买的号被找回了，怎么办？',
      answer: '<p>若您购买的账号被卖家恶意找回，请您点击“个人中心->买家管理->待确认收货”列表页的【申请仲裁】按钮进行仲裁，若仲裁交易失败，货款会退给您。</p><p>但是已经超过了“待买家确认时间”的订单，由于货款已经转账给了卖家，则无法进行仲裁，也无法追回货款。交易虎平台可以为您提供一份【交易证明】，您可以凭此向游戏运营商提起申诉，但游戏账号的最终的归属权是由游戏运营商来判定。</p><p>账号交易存在一定的风险，交易虎平台只保障发货及待确认收货时间的商品安全，无法提供永久的售后，请您悉知！</p>',
      related: [6, 15]
    }
    ,
    {
      id: 8,
      role: 1,
      title: '怎么区分客户端、平台？',
      answer: '<p>主要看您在哪里下载的游戏客户端，以及独立游戏时所填写的账号类型。</p><p>例如，您在应用宝下载了一款王者荣耀，安装后进入时输入的是QQ账号，那么您的该游戏客户端即腾讯客户端。</p>',
      related: [9]
    }
    ,
    {
      id: 9,
      role: 1,
      title: '我买错客户端/平台/机型了，可以退货吗？',
      answer: '<p>很抱歉，虚拟物品交易不支持7天无理由退换货。</p><p>如果您买错了客户端、平台或者机型，只能您自行承担。您可以考虑在交易虎平台再次将商品出售，或者找到对应的客户端、机型安装游戏后去体验。</p>',
      related: [6, 15]
    }
    ,
    {
      id: 10,
      role: 1,
      title: '什么是寄售交易？',
      answer: '<p>寄售交易是指，卖家在发布商品时就已经提供账号和密码等信息，由客服登录卖家账号代替卖家为买家发货，确保交易环节中买卖双方的财物安全。</p>',
      related: []
    }
    ,
    {
      id: 11,
      role: 1,
      title: '交易虎的服务时间段是？',
      answer: '<p>7*24小时全天等候为您服务。</p>',
      related: []

    }
    ,
    {
      id: 12,
      role: 1,
      title: '我想买的游戏在交易虎找不到，怎么办?',
      answer: '<p>亲，您可以将您希望支持交易的游戏名称告知我们，如果有较多的用户进行反馈，我们就会考虑开通该游戏的交易。</p>',
      related: [13, 14]

    }
    ,
    {
      id: 13,
      role: 1,
      title: '我想买的客户端在交易虎找不到，怎么办?',
      answer: '<p>亲，您可以将您希望支持交易的游戏名称+客户端告知我们，如果有较多的用户进行反馈，我们就会考虑开通该游戏客户端的交易。</p>',
      related: [12, 14]
    }
    ,
    {
      id: 14,
      role: 1,
      title: '我想买的服务器在交易虎找不到，怎么办?',
      answer: '<p>亲，您可以将您希望支持交易的游戏名称+服务器告知我们，如果有较多的用户进行反馈，我们就会考虑开通该游戏服务器的交易。</p>',
      related: [12, 13]
    }
    ,
    {
      id: 15,
      role: 1,
      title: '我取消了交易，已支付的货款怎么退回？',
      answer: '<p>亲，订单由客服成功取消后，货款会原路退回给您。</p>',
      related: []
    }
    ,
    {
      id: 16,
      role: 1,
      title: '为什么我买的商品交易失败了？',
      answer: '<p>登录交易虎（www.jiaoyihu.com），进入您的个人中心，然后找到“买家管理->全部订单->交易失败”的订单列表，点击订单标题查看详情说明中的“备注”即可。</p>',
      related: []

    }
    ,
    {
      id: 17,
      role: 2,
      title: '我是卖家，多久才能发货？',
      answer: '<p>正常情况下，客服会在买家支付成功后的30分钟内联系您进行发货。</p><p>发货前我们的客服会通过交易虎网站内的聊天系统尝试联系您，若您没有回应，客服会拨打您的电话或短信通知您回来配合取货，所以不需要您一直盯着聊天界面等客服，您只需留意短信或电话即可。</p><p>若卖家不在线无法交易、或者部分游戏交易量过多临时爆单、或者游戏服务器正在维护、或者游戏出现故障无法登陆、或者遭遇了不可抗拒的因素（办公楼忽然停电、地震、网络被攻击）等特殊情况，会导致发货延期，延期时间视情况而定，也请您不要一直催促，多多谅解！待问题解决后会第一时间为您发货！</p>',
      related: [18, 19, 28, 32]
    }
    ,
    {
      id: 18,
      role: 2,
      title: '我是卖家，催发货',
      answer: '<p>亲，很抱歉让您久等了~！</p><p>正常情况下，客服会在买家支付成功后的30分钟内联系您进行发货，在此期间请不要一直催促客服，客服们是一对多为大家服务的哦，太忙的时候可能无法及时回复您，希望您能够理解！</p><p>若超过这个时间客服仍没有给您发货，有可能是因为：卖家不在线无法进行交易、或者部分游戏交易量过多临时爆单、或者游戏服务器正在维护、或者游戏出现故障无法登陆、或者遭遇了不可抗拒的因素（办公楼忽然停电、地震、网络被攻击）等特殊情况，会导致发货延期，延期时间视情况而定，也请您不要一直催促，多多谅解！待问题解决后会第一时间为您发货！</p><p>发货前我们的客服会通过交易虎网站内的聊天系统尝试联系您，若您没有回应，客服会拨打您的电话或短信通知您回来配合取货，所以不需要您一直盯着聊天界面等客服，您只需留意短信或电话即可。</p>',
      related: [28, 32]
    }
    ,
    {
      id: 19,
      role: 2,
      title: '怎么联系发货客服？',
      answer: '<p>登录交易虎（www.jiaoyihu.com），进入您的个人中心，然后找到“卖家管理->交易中”的订单列表，点击【联系发货客服】按钮，即可联系到发货客服。</p><p>由于每笔订单的发货客服不是同一个人，若您有多个交易中的订单，请根据订单分开联系每个发货客服。</p><p>防骗提示：交易虎不会使用任何站外的方式联系您（如QQ、微信、贴吧、微博、邮箱等），短信和电话也仅仅会通知您回到交易虎网站联系我们，不会向您索要账号密码，更不会让您以任何名义转账或去其他网站购买商品，谨防上当受骗！！！</p>',
      related: [18, 19]
    }
    ,
    {
      id: 20,
      role: 2,
      title: '怎么发布商品？',
      answer: '<p>亲，您可以找到任意页面上的【我要卖】按钮，点击后按照提示步骤填写发布信息，即可发布商品。</p>',
      related: [21, 22, 23, 26, 28]
    }
    ,
    {
      id: 21,
      role: 2,
      title: '商品审核要多久？',
      answer: '<p>我们会在30分钟内完成商品基本信息的审核，审核通过后商品才会上架显示，没有审核通过之前其他用户是看不到您发布的商品哦。</p>',
      related: [23]
    }
    ,
    {
      id: 22,
      role: 2,
      title: '商品发布时图片有什么限制吗？',
      answer: '<p>亲，每个商品最多可以上传10张图片，目前仅支持jpg/jpeg/png/bmp几种格式，单张图片的大小不能超过10MB。</p><p>只允许上传游戏内容相关的图片，不得上传游戏以外的图片，也不得包含其他广告、联系方式等水印。</p><p>一旦图片不符合要求，会导致您的商品无法通过审核！</p>',
      related: [20, 21, 23]
    }
    ,
    {
      id: 23,
      role: 2,
      title: '为什么我的商品审核不通过？',
      answer: '<p>亲，请查看审核不通过的原因说明，如果是您的商品描述包含敏感词，请修改商品描述后再尝试提交。如果解释说明您看不懂，再联系我们帮您核查，谢谢~！</p>',
      related: [21]
    }
    ,
    {
      id: 24,
      role: 2,
      title: '我的商品已经售出，怎么没收到钱？',
      answer: '<p>亲，为了保障买卖双方的交易安全，发货完成后货款并不是直接转账给卖家的。</p><p>客服在发货完成后，会预留给买家一些时间进行确认，不同的游戏、商品类型，待买家确认的时间是不一样的，例如：网易账号的确认收货时间是48小时，畅游账号是80小时。在买家没有确认收货之前，货款会暂时由交易虎平台保管。</p><p>一旦买家确认收货，该货款会立即转账到您的交易虎账户余额中，然后您就可以申请提现，取走货款。</p>',
      related: [25, 29, 31, 38, 41]
    }
    ,
    {
      id: 25,
      role: 2,
      title: '提现审核要等多久？',
      answer: '</p>我们会在1个工作日内完成审核，感谢您的耐心等待。</p>',
      related: [40, 41, 42]
    }
    ,
    {
      id: 26,
      role: 2,
      title: '什么是寄售交易？',
      answer: '<p>寄售交易是指，卖家在发布商品时就已经提供账号和密码等信息，由客服登录卖家账号代替卖家为买家发货，确保交易环节中买卖双方的财物安全。</p>',
      related: [27]
    }
    ,
    {
      id: 27,
      role: 2,
      title: '交易虎的服务时间段是？',
      answer: '<p>7*24小时全天等候为您服务。</p>',
      related: [28]
    }
    ,
    {
      id: 28,
      role: 2,
      title: '出售商品要收手续费、服务费之类的费用吗？',
      answer: '<p>目前交易虎的交易服务费为0，也不收取其他任何费用。</p><!--<p>只有在您申请账户余额提现时，支付宝会收取2%的提现费，该笔款项由支付宝直接扣除，不需要您进行任何操作。</p>--><p>提醒：不论是谁通过什么渠道向你索取“手续费、服务费、保证金、保险金”等各种名目的钱，或者要求您转账汇款，绝对都是骗子，请勿上当受骗！！！</p>',
      related: [26, 27, 32, 39, 40, 41, 42]
    }
    ,
    {
      id: 29,
      role: 2,
      title: '买家收到商品又申请仲裁了怎么办？',
      answer: '<p>当买家申请仲裁时，我们的仲裁客服会介入进行调查，如果需要您进行配合了解情况，请您及时协助调查，我们核实后会根据实际情况进行处理。</p><p>账号类商品在买家拿到账号密码之后，如果没有出现商品安全、物品缺失等问题，是不允许退单的，我们也会保障卖家在交易过程中的权益不受损害。</p>',
      related: []
    }
    ,
    {
      id: 30,
      role: 2,
      title: '如何下架商品？',
      answer: '<p>亲，您可以在“个人中心->卖家管理->全部商品”中找到“上架中”的商品列表，选中您想下架的商品点击“下架商品”即可。</p>',
      related: []
    }
    ,
    {
      id: 31,
      role: 2,
      title: '真客服会加我的QQ吗？',
      answer: '<p>交易虎不会使用任何站外的方式联系您（如QQ、微信、贴吧、微博、邮箱等），短信和电话也仅仅会通知您回到交易虎网站联系我们，不会向您索要账号密码，更不会让您以任何名义转账或去其他网站购买商品，谨防上当受骗！！！</p>',
      related: [32]
    }
    ,
    {
      id: 32,
      role: 2,
      title: '我是商品已有人购买，出售流程是怎样的？',
      answer: `
<ul>
  <li><p><a href="/guide/sell?tab=money">游戏币出售流程</a></p></li>
  <li><p><a href="/guide/sell?tab=account">账号出售流程</a></p></li>
  <li><p><a href="/guide/sell?tab=equipment">装备出售流程</a></p></li>
</ul>
  `,
      related: [17, 19, 24, 26, 27, 28, 31, 39]
    }
    ,
    {
      id: 33,
      role: 2,
      title: '我想卖的游戏在交易虎找不到，怎么办?',
      answer: '<p>亲，您可以将您希望支持交易的游戏名称告知我们，如果有较多的用户进行反馈，我们就会考虑开通该游戏的交易。</p>',
      related: [34, 35, 36]
    }
    ,
    {
      id: 34,
      role: 2,
      title: '我想卖的客户端在交易虎找不到，怎么办?',
      answer: '<p>亲，您可以将您希望支持交易的游戏名称+客户端告知我们，如果有较多的用户进行反馈，我们就会考虑开通该游戏客户端的交易。</p>',
      related: [33, 35, 36]
    }
    ,
    {
      id: 35,
      role: 2,
      title: '我想卖的服务器在交易虎找不到，怎么办?',
      answer: '<p>亲，您可以将您希望支持交易的游戏名称+服务器告知我们，如果有较多的用户进行反馈，我们就会考虑开通该游戏服务器的交易。</p>',
      related: [33, 34, 36]
    }
    ,
    {
      id: 36,
      role: 2,
      title: '怎么区分客户端、平台？',
      answer: '<p>主要看您在哪里下载的游戏客户端，以及独立游戏时所填写的账号类型。</p><p>例如，您在腾讯的应用宝下载了一款王者荣耀，安装后进入时输入的是QQ账号，那么您的该游戏客户端即腾讯客户端。</p>',
      related: [33, 34, 35]
    }
    ,
    {
      id: 37,
      role: 2,
      title: '怎么区分机型？',
      answer: '<p>苹果手机是iOS系统，苹果手机越狱后是iOS越狱系统，其他手机均为安卓系统。</p>',
      related: [33, 34, 35, 36]
    }
    ,
    {
      id: 38,
      role: 2,
      title: '我的商品已经有人买了，为什么交易失败了？',
      answer: '<p>登录交易虎（www.jiaoyihu.com），进入您的个人中心，然后找到“卖家管理->全部订单->交易失败”的订单列表，点击订单标题查看详情说明中的“备注”即可。</p>',
      related: []
    }
    ,
    {
      id: 39,
      role: 2,
      title: '我不想卖了，怎么办？',
      answer: '<p>亲，如果您的商品还没有人支付下单，您可以在“个人中心->卖家管理->全部商品”中找到“上架中”的商品列表，选中您想下架的商品点击“下架商品”取消出售。</p><p>如果您的商品已经有人支付下单，进入您的个人中心，然后找到“卖家管理->交易中”的订单列表，点击【联系发货客服】按钮，联系到发货客服告知一下您不想继续出售了。若该商品还没有发货，客服会帮您取消交易并下架商品；如若已经完成发货，很抱歉就无法取消了哦。</p>',
      related: []
    }
    ,
    {
      id: 40,
      role: 2,
      title: '我没有支付宝账号，怎么提现？',
      answer: '<p>很抱歉，目前交易虎仅支持提现到支付宝，需要您注册并实名认证一个支付宝账户才能提现哦。</p>',
      related: []
    }
    ,
    {
      id: 41,
      role: 2,
      title: '为什么提现审核会失败？',
      answer: '<p>亲，请您自己查看审核失败的原因再试，谢谢。</p>',
      related: []
    }
    ,
    {
      id: 42,
      role: 2,
      title: '为什么提现审核成功，转账失败？',
      answer: '<p>亲，这种情况一般是由于提现账户存在问题导致的，请先检查您的提现账户是否已实名认证。</p><p>如果您的账户已实名认证，但转账一直失败，请联系我们为您核查原因，谢谢。</p>',
      related: []
    }
    ,
    {
      id: 43,
      role: 1,
      title: '我成功出售的商品，自动确认收货时间是多久？',
      answer: `
<p>亲，普通道具、游戏币类型商品成功出售货款即时到账，账号类型的自动确认收货时间和各账号体系有关，目前平台开放的账号类型自动确认收货时间具体如下:</p>
<ul>
  <li>UC账号：24小时</li>
  <li>360账号：24小时</li>
  <li>百度账号：24小时</li>
  <li>小米账号：24小时</li>
  <li>华为账号：24小时</li>
  <li>OPPO账号：24小时</li>
  <li>安锋账号：24小时</li>
  <li>果盘账号：24小时</li>
  <li>球球账号：24小时</li>
  <li>哔哩哔哩账号：24小时</li>
  <li>老虎账号：24小时</li>
  <li>龙图账号：24小时</li>
  <li>COM2uS账号：24小时</li>
  <li>游戏猫账号：24小时</li>
  <li>QQ账号：96小时</li>
  <li>微信账号：96小时</li>
</ul>
`,
      related: []
    }
  ],

  /**
   * 防骗说明相关问题
   */
  rule: [1, 2, 3],

  /**
   * 收费规则相关问题
   */
  instruction: [4, 5, 6]
}
