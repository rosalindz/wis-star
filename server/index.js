const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ========== 艺人数据库 ==========
const artists = {
  "董璇": { age:"44岁", hit:"微博热搜40万", match:"✅ 推荐合作", price:"预估40-50w", detail:"已有合作历史（ROI 2.09），适合水润面膜/眼膜/凝颜套装。" },
  "陈妍希": { age:"43岁", hit:"微博热搜31.1万", match:"✅ 推荐合作", price:"预估50-70w", detail:"国民度高，《那些年》覆盖30-50岁。星图报价40万，建议翻包模式。" },
  "王楚然": { age:"27岁", hit:"这一秒过火在播", match:"⏳ 等9月档期", price:"55w含税", detail:"需等到9月凑齐3个品拍。KONO有意向。" },
  "秦海璐": { age:"47岁", hit:"核心资产", match:"✅ 续约放大", price:"续约35w/4个月", detail:"成交594w/期，总ROI 1.70。无授权复用ROI达2.28。" },
  "林心如": { age:"50岁", hit:"双品牌标杆", match:"✅ 深挖权益", price:"53w", detail:"成交572w，ROI 1.68。翻包模式可复制。" },
  "温峥嵘": { age:"47岁", hit:"新晋核心资产", match:"✅ 持续放量", price:"45w", detail:"成交293w，总ROI 1.75最高。" },
  "王琳": { age:"55岁", hit:"高性价比", match:"✅ 持续关注", price:"26.5w", detail:"成交100w，ROI 1.31。合作费最低百万成交。" },
  "吴昕": { age:"42岁", hit:"主持人型验证", match:"✅ 保障型素材", price:"55w首次", detail:"成交210w，口条好适合混剪。" },
  "王鸥": { age:"38岁", hit:"ID模式高ROI", match:"✅ ID轻模式", price:"1-2w(ID模式)", detail:"ID模式成交163w，ROI 1.89。" },
  "于明加": { age:"42岁", hit:"进播型素材", match:"✅ 稳健型", price:"续约40w", detail:"成交78w，进播型稳定素材。" },
  "刘晓庆": { age:"70岁", hit:"效果一般", match:"⚠️ 观望", price:"15w", detail:"成交34w，ROI 1.00。" },
  "梅婷": { age:"50岁", hit:"KONO核心资产", match:"✅ KONO可用", price:"-", detail:"KONO占比74.5%。" },
  "张翰": { age:"41岁", hit:"赫系验证", match:"✅ 赫系可用", price:"131.5w", detail:"成交ROI 2.03。" },
  "王艳": { age:"46岁", hit:"可麦33w成交", match:"✅ 可麦已验证", price:"33w", detail:"1支种草+抖音视频号二传3个月。" },
  "海清": { age:"49岁", hit:"WIS已验证", match:"✅ 适合WIS", price:"55w/3个月", detail:"全平台授权。" },
  "江疏影": { age:"40岁", hit:"WIS报价中", match:"✅ 适合关注", price:"50w", detail:"含妆造+1min种草+3个月信息流授权。" },
  "姜妍": { age:"42岁", hit:"新电影上过", match:"✅ 适合关注", price:"75-80w", detail:"刚上过新电影。" },
  "辣木洋子": { age:"40岁", hit:"有报价记录", match:"✅ 适合评估", price:"55-60w", detail:"不发布。" },
  "辰亦儒": { age:"45岁", hit:"已验证", match:"✅ 适合WIS", price:"32w", detail:"种草发布+抖音信息流3个月。" },
  "杨雪": { age:"46岁", hit:"AI授权", match:"✅ AI模式", price:"10w", detail:"3个月AI授权，低成本测试。" },
  "黄宥明": { age:"40岁", hit:"AI授权", match:"✅ AI模式", price:"6w", detail:"3个月AI授权。" },
  "刘维": { age:"40岁", hit:"AI授权", match:"✅ AI模式", price:"6w", detail:"3个月AI授权。" }
};

// ========== API 路由 ==========

// 搜索艺人
app.get('/api/search', (req, res) => {
  const keyword = req.query.q;
  if (!keyword) return res.json({ found: false });
  const name = Object.keys(artists).find(k => k.includes(keyword));
  if (name) {
    res.json({ found: true, name, ...artists[name] });
  } else {
    res.json({ found: false });
  }
});

// 获取推荐艺人列表
app.get('/api/recommend', (req, res) => {
  res.json([
    { name:"董璇", stars:4, heat:"微博热搜40万 · 家庭话题", price:"预估40-50w（单人）", age:"44岁", work:"《雪花女神龙》《八大豪族》", reason:"本周微博热搜40万，精准命中30-50岁精致妈妈人群。已有合作历史（ROI 2.09），建议单人合作。", tags:["已有合作基础","ROI 2.09"] },
    { name:"陈妍希", stars:4, heat:"微博31.1万 · 追星话题", price:"预估50-70w（需询价）", age:"43岁", work:"《那些年》《神雕侠侣》", reason:"43岁，《那些年》覆盖30-50岁人群。星图报价40万，建议翻包模式（参考林心如53w）。", tags:["新推荐","国民度高"] }
  ]);
});

// 获取热点数据
app.get('/api/hot', (req, res) => {
  res.json({
    weibo: [
      { rank:1, text:"谁敢认这是娜扎", heat:"239.9万", note:"❌ 流量艺人" },
      { rank:2, text:"爱情公寓的结局在这一刻释怀了", heat:"95.7万", note:"🔍 关注演员" },
      { rank:4, text:"董璇张维伊当着小酒窝的面亲亲", heat:"40.0万", note:"✅ 推荐合作" },
      { rank:6, text:"陈妍希姐姐追星张凌赫", heat:"31.1万", note:"✅ 推荐关注" }
    ],
    douyin: [
      { rank:1, text:"今日大暑", heat:"1089.6万" },
      { rank:3, text:"周星驰手写2000张亲签", heat:"766.9万" }
    ],
    xhs: [
      { rank:1, text:"2026上半年综艺播放霸屏榜", heat:"340" },
      { rank:2, text:"《亲爱的客栈2026》海边慢综", heat:"225" }
    ]
  });
});

// ========== 前端路由兜底 ==========
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`WIS明星合作推荐系统已启动 → http://0.0.0.0:${PORT}`);
});
