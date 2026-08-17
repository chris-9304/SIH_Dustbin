const DELHI_AREAS=[
  {id:"cp",name:"Connaught Place",lat:28.6315,lng:77.2167,ward:"New Delhi"},
  {id:"kb",name:"Karol Bagh",lat:28.6519,lng:77.1909,ward:"Karol Bagh"},
  {id:"ln",name:"Lajpat Nagar",lat:28.5677,lng:77.2433,ward:"South Delhi"},
  {id:"hk",name:"Hauz Khas",lat:28.5431,lng:77.2066,ward:"South Delhi"},
  {id:"ro",name:"Rohini",lat:28.7326,lng:77.1122,ward:"North West"},
  {id:"dw",name:"Dwarka",lat:28.5921,lng:77.0460,ward:"South West"},
  {id:"sk",name:"Saket",lat:28.5244,lng:77.2066,ward:"South Delhi"},
  {id:"np",name:"Nehru Place",lat:28.5491,lng:77.2519,ward:"South Delhi"},
  {id:"cc",name:"Chandni Chowk",lat:28.6505,lng:77.2303,ward:"North Delhi"},
  {id:"jk",name:"Janakpuri",lat:28.6217,lng:77.0824,ward:"West Delhi"},
  {id:"pt",name:"Pitampura",lat:28.7007,lng:77.1337,ward:"North West"},
  {id:"mv",name:"Mayur Vihar",lat:28.6068,lng:77.2942,ward:"East Delhi"},
  {id:"vk",name:"Vasant Kunj",lat:28.5200,lng:77.1584,ward:"South West"},
  {id:"se",name:"South Extension",lat:28.5752,lng:77.2197,ward:"South Delhi"},
  {id:"pv",name:"Preet Vihar",lat:28.6400,lng:77.2958,ward:"East Delhi"},
  {id:"un",name:"Uttam Nagar",lat:28.6200,lng:77.0577,ward:"West Delhi"},
  {id:"sh",name:"Shahdara",lat:28.6733,lng:77.2897,ward:"Shahdara"},
  {id:"lx",name:"Laxmi Nagar",lat:28.6304,lng:77.2798,ward:"East Delhi"},
  {id:"pn",name:"Patel Nagar",lat:28.6402,lng:77.1793,ward:"West Delhi"},
  {id:"gt",name:"GTB Nagar",lat:28.7030,lng:77.2033,ward:"North Delhi"},
];

const DELHI_BINS=[
  {id:1,name:"Rajiv Chowk Gate 7",area:"Connaught Place",lat:28.6328,lng:77.2197,level:87,type:"Mixed",ward:"New Delhi",status:"full",recyclability:68,disposals60d:30,bioLevel:72,biodegradability:45},
  {id:2,name:"Palika Bazaar Entrance",area:"Connaught Place",lat:28.6308,lng:77.2143,level:45,type:"Recyclable",ward:"New Delhi",status:"ok",recyclability:53,disposals60d:72,bioLevel:38,biodegradability:78},
  {id:3,name:"CP Inner Circle Park",area:"Connaught Place",lat:28.6335,lng:77.2162,level:63,type:"Organic",ward:"New Delhi",status:"medium",recyclability:40,disposals60d:59,bioLevel:81,biodegradability:82},
  {id:4,name:"Ajmal Khan Rd Crossing",area:"Karol Bagh",lat:28.6525,lng:77.1906,level:92,type:"Mixed",ward:"Karol Bagh",status:"full",recyclability:36,disposals60d:28,bioLevel:65,biodegradability:40},
  {id:5,name:"KB Metro Pillar Gate",area:"Karol Bagh",lat:28.6510,lng:77.1920,level:38,type:"Recyclable",ward:"Karol Bagh",status:"ok",recyclability:86,disposals60d:24,bioLevel:22,biodegradability:85},
  {id:6,name:"Tank Road Market",area:"Karol Bagh",lat:28.6540,lng:77.1890,level:71,type:"Organic",ward:"Karol Bagh",status:"medium",recyclability:62,disposals60d:110,bioLevel:88,biodegradability:75},
  {id:7,name:"Chandni Chowk Main Gate",area:"Chandni Chowk",lat:28.6505,lng:77.2303,level:95,type:"Mixed",ward:"North Delhi",status:"full",recyclability:30,disposals60d:9,bioLevel:90,biodegradability:35},
  {id:8,name:"Khari Baoli Spice Mkt",area:"Chandni Chowk",lat:28.6533,lng:77.2250,level:88,type:"Organic",ward:"North Delhi",status:"full",recyclability:30,disposals60d:57,bioLevel:95,biodegradability:88},
  {id:9,name:"Fatehpuri Mosque Corner",area:"Chandni Chowk",lat:28.6519,lng:77.2219,level:55,type:"Recyclable",ward:"North Delhi",status:"medium",recyclability:66,disposals60d:131,bioLevel:44,biodegradability:72},
  {id:10,name:"LN Central Market",area:"Lajpat Nagar",lat:28.5677,lng:77.2433,level:76,type:"Mixed",ward:"South Delhi",status:"medium",recyclability:66,disposals60d:8,bioLevel:68,biodegradability:50},
  {id:11,name:"Ring Road LN Bus Stop",area:"Lajpat Nagar",lat:28.5660,lng:77.2460,level:42,type:"Recyclable",ward:"South Delhi",status:"ok",recyclability:87,disposals60d:52,bioLevel:31,biodegradability:80},
  {id:12,name:"LN-3 Park Gate East",area:"Lajpat Nagar",lat:28.5694,lng:77.2410,level:18,type:"Organic",ward:"South Delhi",status:"ok",recyclability:59,disposals60d:109,bioLevel:15,biodegradability:90},
  {id:13,name:"Hauz Khas Village Gate",area:"Hauz Khas",lat:28.5431,lng:77.2066,level:34,type:"Recyclable",ward:"South Delhi",status:"ok",recyclability:66,disposals60d:116,bioLevel:29,biodegradability:77},
  {id:14,name:"IIT Delhi Back Gate",area:"Hauz Khas",lat:28.5462,lng:77.1924,level:22,type:"Hazardous",ward:"South Delhi",status:"ok",recyclability:45,disposals60d:73,bioLevel:18,biodegradability:30},
  {id:15,name:"Deer Park Entrance",area:"Hauz Khas",lat:28.5563,lng:77.2023,level:89,type:"Organic",ward:"South Delhi",status:"full",recyclability:25,disposals60d:42,bioLevel:84,biodegradability:88},
  {id:16,name:"Rohini Sec-3 Metro Exit",area:"Rohini",lat:28.7326,lng:77.1122,level:62,type:"Mixed",ward:"North West",status:"medium",recyclability:55,disposals60d:89,bioLevel:55,biodegradability:60},
  {id:17,name:"Rohini West Market",area:"Rohini",lat:28.7350,lng:77.1090,level:83,type:"Recyclable",ward:"North West",status:"full",recyclability:69,disposals60d:41,bioLevel:40,biodegradability:55},
  {id:18,name:"Sec-11 Community Centre",area:"Rohini",lat:28.7298,lng:77.1155,level:28,type:"Organic",ward:"North West",status:"ok",recyclability:38,disposals60d:88,bioLevel:25,biodegradability:82},
  {id:19,name:"Dwarka Sec-10 Metro",area:"Dwarka",lat:28.5921,lng:77.0460,level:55,type:"Mixed",ward:"South West",status:"medium",recyclability:34,disposals60d:25,bioLevel:48,biodegradability:65},
  {id:20,name:"Dwarka Sector 6 Park",area:"Dwarka",lat:28.5880,lng:77.0508,level:33,type:"Organic",ward:"South West",status:"ok",recyclability:49,disposals60d:26,bioLevel:30,biodegradability:78},
  {id:21,name:"Dwarka Expressway Stop",area:"Dwarka",lat:28.5960,lng:77.0390,level:78,type:"Recyclable",ward:"South West",status:"medium",recyclability:74,disposals60d:90,bioLevel:62,biodegradability:58},
  {id:22,name:"Select City Walk Exit",area:"Saket",lat:28.5244,lng:77.2066,level:61,type:"Recyclable",ward:"South Delhi",status:"medium",recyclability:90,disposals60d:69,bioLevel:35,biodegradability:70},
  {id:23,name:"Saket Metro Gate 2",area:"Saket",lat:28.5218,lng:77.2088,level:47,type:"Mixed",ward:"South Delhi",status:"ok",recyclability:30,disposals60d:119,bioLevel:44,biodegradability:42},
  {id:24,name:"PVR Anupam Complex",area:"Saket",lat:28.5266,lng:77.2044,level:85,type:"Mixed",ward:"South Delhi",status:"full",recyclability:62,disposals60d:33,bioLevel:78,biodegradability:62},
  {id:25,name:"Nehru Place IT Hub Gate",area:"Nehru Place",lat:28.5491,lng:77.2519,level:93,type:"Recyclable",ward:"South Delhi",status:"full",recyclability:76,disposals60d:22,bioLevel:52,biodegradability:55},
  {id:26,name:"Nehru Place Metro Exit",area:"Nehru Place",lat:28.5476,lng:77.2535,level:66,type:"Mixed",ward:"South Delhi",status:"medium",recyclability:63,disposals60d:77,bioLevel:60,biodegradability:65},
  {id:27,name:"Outer Ring Road Stop NP",area:"Nehru Place",lat:28.5508,lng:77.2490,level:40,type:"Organic",ward:"South Delhi",status:"ok",recyclability:65,disposals60d:160,bioLevel:38,biodegradability:80},
  {id:28,name:"Janakpuri West Metro",area:"Janakpuri",lat:28.6217,lng:77.0824,level:57,type:"Mixed",ward:"West Delhi",status:"medium",recyclability:51,disposals60d:149,bioLevel:55,biodegradability:58},
  {id:29,name:"District Centre JK",area:"Janakpuri",lat:28.6233,lng:77.0796,level:29,type:"Recyclable",ward:"West Delhi",status:"ok",recyclability:64,disposals60d:19,bioLevel:25,biodegradability:72},
  {id:30,name:"JK C-Block Park Gate",area:"Janakpuri",lat:28.6198,lng:77.0850,level:74,type:"Organic",ward:"West Delhi",status:"medium",recyclability:27,disposals60d:171,bioLevel:72,biodegradability:85},
  {id:31,name:"Pitampura TV Tower Road",area:"Pitampura",lat:28.7007,lng:77.1337,level:48,type:"Mixed",ward:"North West",status:"ok",recyclability:42,disposals60d:76,bioLevel:45,biodegradability:55},
  {id:32,name:"Netaji Subhash Place Mtr",area:"Pitampura",lat:28.6980,lng:77.1505,level:81,type:"Recyclable",ward:"North West",status:"full",recyclability:57,disposals60d:61,bioLevel:58,biodegradability:50},
  {id:33,name:"Pitampura D-Block Market",area:"Pitampura",lat:28.7030,lng:77.1310,level:36,type:"Organic",ward:"North West",status:"ok",recyclability:31,disposals60d:99,bioLevel:32,biodegradability:80},
  {id:34,name:"Mayur Vihar Ph-1 Metro",area:"Mayur Vihar",lat:28.6068,lng:77.2942,level:69,type:"Mixed",ward:"East Delhi",status:"medium",recyclability:45,disposals60d:118,bioLevel:65,biodegradability:60},
  {id:35,name:"MV Pocket-3 Corner",area:"Mayur Vihar",lat:28.6090,lng:77.2910,level:52,type:"Organic",ward:"East Delhi",status:"medium",recyclability:65,disposals60d:95,bioLevel:50,biodegradability:70},
  {id:36,name:"New Ashok Nagar Market",area:"Mayur Vihar",lat:28.6040,lng:77.2975,level:88,type:"Mixed",ward:"East Delhi",status:"full",recyclability:38,disposals60d:96,bioLevel:82,biodegradability:52},
  {id:37,name:"VK Sector B Market",area:"Vasant Kunj",lat:28.5200,lng:77.1584,level:43,type:"Organic",ward:"South West",status:"ok",recyclability:47,disposals60d:55,bioLevel:40,biodegradability:78},
  {id:38,name:"Ambience Mall Gate",area:"Vasant Kunj",lat:28.5178,lng:77.1565,level:67,type:"Recyclable",ward:"South West",status:"medium",recyclability:69,disposals60d:176,bioLevel:48,biodegradability:65},
  {id:39,name:"DLF Promenade Entrance",area:"Vasant Kunj",lat:28.5223,lng:77.1599,level:91,type:"Mixed",ward:"South West",status:"full",recyclability:32,disposals60d:157,bioLevel:88,biodegradability:48},
  {id:40,name:"South Ex Part-1 Market",area:"South Extension",lat:28.5752,lng:77.2197,level:77,type:"Mixed",ward:"South Delhi",status:"medium",recyclability:68,disposals60d:45,bioLevel:70,biodegradability:60},
  {id:41,name:"Ring Road SE Bus Stop",area:"South Extension",lat:28.5733,lng:77.2220,level:55,type:"Recyclable",ward:"South Delhi",status:"medium",recyclability:86,disposals60d:64,bioLevel:52,biodegradability:72},
  {id:42,name:"South Ex Park Corner",area:"South Extension",lat:28.5770,lng:77.2174,level:31,type:"Organic",ward:"South Delhi",status:"ok",recyclability:35,disposals60d:120,bioLevel:28,biodegradability:82},
  {id:43,name:"Preet Vihar Metro Gate",area:"Preet Vihar",lat:28.6400,lng:77.2958,level:84,type:"Mixed",ward:"East Delhi",status:"full",recyclability:52,disposals60d:71,bioLevel:80,biodegradability:55},
  {id:44,name:"Vikas Marg V-3 Market",area:"Preet Vihar",lat:28.6420,lng:77.2930,level:59,type:"Recyclable",ward:"East Delhi",status:"medium",recyclability:92,disposals60d:178,bioLevel:42,biodegradability:75},
  {id:45,name:"Uttam Nagar East Metro",area:"Uttam Nagar",lat:28.6200,lng:77.0577,level:72,type:"Mixed",ward:"West Delhi",status:"medium",recyclability:63,disposals60d:58,bioLevel:68,biodegradability:62},
  {id:46,name:"UN Main Market Crossing",area:"Uttam Nagar",lat:28.6218,lng:77.0549,level:90,type:"Mixed",ward:"West Delhi",status:"full",recyclability:48,disposals60d:16,bioLevel:85,biodegradability:45},
  {id:47,name:"Shahdara Metro Terminal",area:"Shahdara",lat:28.6733,lng:77.2897,level:66,type:"Mixed",ward:"Shahdara",status:"medium",recyclability:42,disposals60d:10,bioLevel:62,biodegradability:48},
  {id:48,name:"Shahdara GPO Crossing",area:"Shahdara",lat:28.6755,lng:77.2870,level:45,type:"Recyclable",ward:"Shahdara",status:"ok",recyclability:72,disposals60d:104,bioLevel:40,biodegradability:68},
  {id:49,name:"Mansarovar Park Gate",area:"Shahdara",lat:28.6710,lng:77.2920,level:82,type:"Organic",ward:"Shahdara",status:"full",recyclability:42,disposals60d:18,bioLevel:78,biodegradability:52},
  {id:50,name:"Laxmi Nagar Metro Exit",area:"Laxmi Nagar",lat:28.6304,lng:77.2798,level:79,type:"Mixed",ward:"East Delhi",status:"medium",recyclability:41,disposals60d:147,bioLevel:72,biodegradability:55},
  {id:51,name:"Vikas Marg LN Chowk",area:"Laxmi Nagar",lat:28.6325,lng:77.2775,level:94,type:"Mixed",ward:"East Delhi",status:"full",recyclability:48,disposals60d:56,bioLevel:88,biodegradability:48},
  {id:52,name:"Krishna Nagar Market",area:"Laxmi Nagar",lat:28.6280,lng:77.2820,level:37,type:"Recyclable",ward:"East Delhi",status:"ok",recyclability:83,disposals60d:103,bioLevel:35,biodegradability:75},
  {id:53,name:"Patel Nagar Metro Gate",area:"Patel Nagar",lat:28.6402,lng:77.1793,level:58,type:"Mixed",ward:"West Delhi",status:"medium",recyclability:57,disposals60d:38,bioLevel:55,biodegradability:60},
  {id:54,name:"Shadipur Colony Market",area:"Patel Nagar",lat:28.6425,lng:77.1770,level:44,type:"Recyclable",ward:"West Delhi",status:"ok",recyclability:68,disposals60d:37,bioLevel:42,biodegradability:65},
  {id:55,name:"GTB Nagar Metro Exit",area:"GTB Nagar",lat:28.7030,lng:77.2033,level:71,type:"Mixed",ward:"North Delhi",status:"medium",recyclability:43,disposals60d:145,bioLevel:68,biodegradability:52},
  {id:56,name:"Delhi Univ North Gate",area:"GTB Nagar",lat:28.7050,lng:77.2008,level:26,type:"Recyclable",ward:"North Delhi",status:"ok",recyclability:86,disposals60d:69,bioLevel:22,biodegradability:78},
  {id:57,name:"Model Town Market",area:"GTB Nagar",lat:28.7010,lng:77.2060,level:86,type:"Organic",ward:"North Delhi",status:"full",recyclability:62,disposals60d:111,bioLevel:80,biodegradability:72},
  {id:58,name:"ITO Crossing Red Light",area:"Connaught Place",lat:28.6280,lng:77.2408,level:96,type:"Mixed",ward:"New Delhi",status:"full",recyclability:65,disposals60d:104,bioLevel:90,biodegradability:50},
  {id:59,name:"AIIMS Gate South Entry",area:"Hauz Khas",lat:28.5672,lng:77.2099,level:41,type:"Hazardous",ward:"South Delhi",status:"ok",recyclability:31,disposals60d:58,bioLevel:38,biodegradability:42},
  {id:60,name:"Red Fort North Parking",area:"Chandni Chowk",lat:28.6562,lng:77.2410,level:88,type:"Mixed",ward:"North Delhi",status:"full",recyclability:36,disposals60d:132,bioLevel:85,biodegradability:40},
];

const WASTE_META={
  biodegradable:{color:"#10B981",label:"Biodegradable",bin:"Green Bin 🟢",icon:"🍃",pts:12},
  recyclable:{color:"#3B82F6",label:"Recyclable",bin:"Blue Bin 🔵",icon:"♻️",pts:10},
  hazardous:{color:"#F59E0B",label:"Hazardous",bin:"Red Bin 🔴",icon:"⚠️",pts:5},
  residual:{color:"#6B7280",label:"Residual",bin:"Black Bin ⬛",icon:"🗑️",pts:3},
};

const PERKS=[
  {id:1,icon:"⚡",title:"BSES Bill Discount",desc:"5% off electricity",pts:500},
  {id:2,icon:"🚌",title:"DTC Bus Pass Credit",desc:"₹50 transit credit",pts:300},
  {id:3,icon:"🛒",title:"Ration Shop Bonus",desc:"₹30 at PDS outlet",pts:200},
  {id:4,icon:"🔥",title:"LPG Voucher Delhi",desc:"₹100 subsidy",pts:800},
  {id:5,icon:"🌳",title:"Park Entry Free",desc:"Monthly NDMC pass",pts:150},
  {id:6,icon:"🏛️",title:"Property Tax Rebate",desc:"0.5% MCD rebate",pts:2000},
];

function hotspotScore(bin){
  const activityScore=Math.max(0,100-(bin.disposals60d||0)*2.5);
  const recycScore=Math.max(0,100-(bin.recyclability||50));
  const bioScore=Math.max(0,100-(bin.biodegradability||50));
  const fillPressure=Math.max(bin.level||0,bin.bioLevel||0);
  return Math.round(activityScore*.4+recycScore*.3+bioScore*.2+(fillPressure>.80?10:0));
}
function isHotspot(bin){return hotspotScore(bin)>=60;}
function recycleHotspotScore(bin){const act=Math.max(0,100-(bin.disposals60d||0)*2.5);const recyGap=Math.max(0,100-(bin.recyclability||50));const fillP=bin.level>80?15:bin.level>55?5:0;return Math.round(act*.5+recyGap*.35+fillP*.15);}
function bioHotspotScore(bin){const act=Math.max(0,100-(bin.disposals60d||0)*2.5);const bioGap=Math.max(0,100-(bin.biodegradability||50));const fillP=(bin.bioLevel||0)>80?15:(bin.bioLevel||0)>55?5:0;return Math.round(act*.5+bioGap*.35+fillP*.15);}
function isRecycleHotspot(bin){return recycleHotspotScore(bin)>=55;}
function isBioHotspot(bin){return bioHotspotScore(bin)>=55;}


const JSONBIN_ID='69c108beb7ec241ddc945b90';
const JSONBIN_KEY='$2a$10$3V4SfavKc9Bl4mqBQa9gWecPQNScG5QvVf1xNBFvxzKbI4nsTH2Du';
const JSONBIN_URL=`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`;

let _syncTimer=null;

function cloudSync(immediate){
  if(_syncTimer)clearTimeout(_syncTimer);
  _syncTimer=setTimeout(function(){
    const key=JSONBIN_KEY;
    if(!key||key.includes('YOUR'))return;
    const users=loadUsers();
    const payload={
      meta:{
        version:'v4.3',city:'Delhi NCT',
        totalBins:DELHI_BINS.length,
        updatedAt:new Date().toISOString(),
        syncedBy:S.currentUser?S.currentUser.name:'system'
      },
      users:users.map(function(u){return{
        id:u.id,name:u.name,contact:u.contact,
        password:u.password,role:u.role,
        securityQuestion:u.securityQuestion||'',
        securityAnswer:u.securityAnswer||'',
        pts:u.pts||0,scans:u.scans||0,
        verifications:u.verifications||0,
        joinedAt:u.joinedAt,lastActive:u.lastActive||u.joinedAt
      };}),
      presenceLog:S.presenceLog.slice(0,200),
      sessionStats:{
        totalUsers:users.length,
        totalCheckins:S.presenceLog.length,
        totalWasteCoins:users.reduce(function(s,u){return s+(u.pts||0);},0),
        roles:{
          citizen:users.filter(function(u){return u.role==='citizen';}).length,
          collector:users.filter(function(u){return u.role==='collector';}).length,
          municipality:users.filter(function(u){return u.role==='municipality';}).length,
          admin:users.filter(function(u){return u.role==='admin';}).length
        }
      }
    };
    fetch('https://api.jsonbin.io/v3/b/'+JSONBIN_ID,{
      method:'PUT',
      headers:{'Content-Type':'application/json','X-Master-Key':key,'X-Bin-Private':'false'},
      body:JSON.stringify(payload)
    }).then(function(r){showSyncBadge(r.ok?'✓ Synced':'⚠ Sync error');})
    .catch(function(){showSyncBadge('⚠ Offline');});
  },immediate?0:1500);
}

function showSyncBadge(msg){
  let b=document.getElementById('nd-sync-badge');
  if(!b){
    b=document.createElement('div');b.id='nd-sync-badge';
    b.style.cssText='position:fixed;bottom:18px;right:18px;z-index:9999;padding:7px 16px;border-radius:20px;font-family:monospace;font-size:12px;font-weight:700;backdrop-filter:blur(12px);border:1px solid;transition:opacity .5s;pointer-events:none';
    document.body.appendChild(b);
  }
  const ok=msg.startsWith('✓');
  b.textContent=msg;
  b.style.background=ok?'rgba(6,95,70,.12)':'rgba(185,28,28,.12)';
  b.style.color=ok?'#065F46':'#B91C1C';
  b.style.borderColor=ok?'rgba(6,95,70,.25)':'rgba(185,28,28,.25)';
  b.style.opacity='1';
  clearTimeout(b._t);
  b._t=setTimeout(function(){b.style.opacity='0';},2800);
}

async function cloudLoad(){
  const key=JSONBIN_KEY;
  if(!key||key.includes('YOUR'))return;
  try{
    const r=await fetch('https://api.jsonbin.io/v3/b/'+JSONBIN_ID+'/latest',{headers:{'X-Master-Key':key}});
    if(!r.ok)return;
    const d=await r.json();
    const cloud=d.record;
    if(cloud.users&&cloud.users.length){
      const local=loadUsers();
      const merged=[...cloud.users];
      local.forEach(u=>{if(!merged.find(m=>m.id===u.id))merged.push(u);});
      localStorage.setItem('nd_users',JSON.stringify(merged));
      if(S.currentUser){
        const fresh=merged.find(u=>u.id===S.currentUser.id);
        if(fresh){S.currentUser=fresh;S.cPts=fresh.pts||0;}
      }
    }
    if(cloud.presenceLog&&cloud.presenceLog.length)S.presenceLog=cloud.presenceLog;
    showSyncBadge('✓ Cloud loaded');
  }catch(e){showSyncBadge('⚠ Load failed');}
}

function loadUsers(){try{return JSON.parse(localStorage.getItem('nd_users')||'[]');}catch(e){return[];}}
function saveUsers(users){try{localStorage.setItem('nd_users',JSON.stringify(users));}catch(e){}cloudSync();}
function findUser(contact,password){const c=contact.toLowerCase();return loadUsers().find(u=>(u.contact||u.username||'').toLowerCase()===c&&u.password===password);}
function registerUser(data){
  const users=loadUsers();
  if(users.find(u=>(u.contact||'').toLowerCase()===(data.contact||'').toLowerCase()))return{err:'Phone/email already registered'};
  const user={...data,id:genId(),joinedAt:Date.now(),pts:0,scans:0,verifications:0};
  users.push(user);saveUsers(users);return{ok:true,user};
}

const haversine=(la1,lo1,la2,lo2)=>{const R=6371,dLa=(la2-la1)*Math.PI/180,dLo=(lo2-lo1)*Math.PI/180;const a=Math.sin(dLa/2)**2+Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dLo/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));};
const nearbyBins=(lat,lng,n=6)=>[...DELHI_BINS].map(b=>({...b,dist:haversine(lat,lng,b.lat,b.lng)})).sort((a,b)=>a.dist-b.dist).slice(0,n);
const routeDist=(bins)=>{let t=0;for(let i=0;i<bins.length-1;i++)t+=haversine(bins[i].lat,bins[i].lng,bins[i+1].lat,bins[i+1].lng);return t;};
const genToken=()=>Math.random().toString(36).substring(2,8).toUpperCase();
const genId=()=>`ND-${Date.now().toString(36).toUpperCase().slice(-6)}`;
const fmtTime=(s)=>`${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
const binColor=(lvl)=>lvl>80?"#EF4444":lvl>55?"#F59E0B":"#10B981";
const binBioColor=(lvl)=>lvl>80?"#EF4444":lvl>55?"#F59E0B":"#34D399";
const binStatusLabel=(b)=>b.level>80||b.bioLevel>80?'🔴 Critical':b.level>55||b.bioLevel>55?'🟡 Medium':'🟢 Normal';
const esc=(s)=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

let S={
  screen:"landing",role:"citizen",page:"dashboard",
  currentUser:null,
  cPts:0,pPts:0,pSess:[],actSess:null,
  collectorRoute:[],collectorBioRoute:[],confetti:false,sbOpen:false,
  userArea:null,showLoc:false,showAuth:false,authPreRole:null,
  locSearch:"",locSel:DELHI_AREAS[0],locMode:"area",locGps:"idle",
  authSignup:true,authRole:"citizen",
  authForm:{name:'',contact:'',password:'',secQ:'',secA:'',err:''},
  scan:{stage:"idle",preview:null,b64:null,mime:"image/jpeg",result:null,err:"",prog:0,apiKey:"",keyStatus:{state:"empty",msg:""}},
  iot:{bins:[...DELHI_BINS],filt:"all",view:'cards',search:'',flyTo:null,qrBin:null,qrScanned:false,presenceStatus:'idle'},
  presenceLog:[],
  qrScan:{binId:null,status:'idle',pts:0},
  route:{filter:"crit",areaF:"all",started:false,bioStarted:false,flyTo:null,hoverId:null,optMsg:"",bioOptMsg:"",startPoint:null,showSPick:true,routeTab:"recycle"},
  muni:{mapMode:"hotspot",hotspotType:"recycle",selWard:"all",flyTo:null},
  verify:{step:1,tLeft:3600,proof:null,prevPic:null,failR:"",busy:false,qrModal:false},
  rewards:{toast:null},
  settings:{lang:"en",notifs:{scan:true,pickup:true,verify:true,rewards:true,alerts:false}},
  admin:{tab:'users'},
  proto:{data:null,loading:false,lastFetch:null,err:null},
};

let _leafletReady=false,_leafletCBs=[];
function loadLeaflet(cb){
  if(_leafletReady&&window.L){cb();return;}
  _leafletCBs.push(cb);
  if(_leafletCBs.length>1)return;
  const flush=()=>{_leafletReady=true;const q=[..._leafletCBs];_leafletCBs=[];q.forEach(f=>f());};
  if(window.L){flush();return;}
  const jsUrls=['https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
  let idx=0;
  function tryNext(){if(idx>=jsUrls.length){console.error('All Leaflet CDNs blocked');return;}const s=document.createElement('script');s.src=jsUrls[idx++];s.onload=()=>{if(window.L)flush();else tryNext();};s.onerror=()=>tryNext();document.head.appendChild(s);}
  tryNext();
}

const MAPS={};
function destroyMap(id){if(!MAPS[id])return;try{if(MAPS[id].routingControl)MAPS[id].map.removeControl(MAPS[id].routingControl);MAPS[id].map.remove();}catch(e){}delete MAPS[id];}
function destroyAllMaps(){Object.keys(MAPS).forEach(destroyMap);}

function initMap(containerId,opts={}){
  const el=document.getElementById(containerId);
  if(!el)return;
  const{bins=DELHI_BINS,routeBins=[],showHotspots=false,flyTo=null,startPoint=null,height=440,onBinClickFn=null}=opts;
  if(MAPS[containerId]){MAPS[containerId].opts={bins,routeBins,showHotspots,startPoint,onBinClickFn};renderMapLayers(containerId);if(flyTo)MAPS[containerId].map.flyTo([flyTo.lat,flyTo.lng],14,{duration:1});return;}
  el.style.height=height+'px';el.style.background='#1a2035';el.style.borderRadius='12px';el.style.overflow='hidden';
  requestAnimationFrame(()=>{
    loadLeaflet(()=>{
      if(!document.getElementById(containerId))return;
      if(MAPS[containerId])return;
      const L=window.L;
      const map=L.map(containerId,{center:[28.6139,77.2090],zoom:11,zoomControl:true});
      const carto=L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OSM &copy; CARTO',subdomains:'abcd',maxZoom:19});
      const osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap',maxZoom:19});
      let cartoFailed=false;
      carto.on('tileerror',()=>{if(!cartoFailed){cartoFailed=true;carto.remove();osm.addTo(map);}});
      carto.addTo(map);
      const layers={bins:L.layerGroup().addTo(map),route:L.layerGroup().addTo(map),hotspot:L.layerGroup().addTo(map),start:L.layerGroup().addTo(map)};
      MAPS[containerId]={map,layers,opts:{bins,routeBins,showHotspots,startPoint,onBinClickFn}};
      renderMapLayers(containerId);
      if(flyTo)setTimeout(()=>map.flyTo([flyTo.lat,flyTo.lng],14,{duration:1}),400);
      if(opts.fitAll&&bins.length>0){setTimeout(()=>{const bounds=L.latLngBounds(bins.map(b=>[b.lat,b.lng]));map.fitBounds(bounds,{padding:[40,40]});},400);}
      setTimeout(()=>map.invalidateSize(),150);
      setTimeout(()=>map.invalidateSize(),600);
    });
  });
}

function updateMapLayers(containerId,opts={}){if(!MAPS[containerId])return;MAPS[containerId].opts={...MAPS[containerId].opts,...opts};renderMapLayers(containerId);}

function renderMapLayers(id){
  const m=MAPS[id];if(!m||!window.L)return;
  const L=window.L;
  const{bins,routeBins,showHotspots,startPoint,onBinClickFn}=m.opts;
  const{layers,map}=m;
  layers.bins.clearLayers();
  bins.forEach(bin=>{
    if(bin.id===999){const lvl=Math.max(bin.level,bin.bioLevel||0);const pc=binColor(lvl);const pIcon=L.divIcon({html:`<div style="position:relative;width:40px;height:40px"><div class="proto-marker-ring" style="position:absolute;inset:0;border-radius:50%;background:${pc};opacity:.25"></div><div style="position:absolute;inset:6px;border-radius:50%;background:${pc};border:3px solid white;box-shadow:0 0 12px ${pc};display:flex;align-items:center;justify-content:center;font-size:12px">📡</div></div>`,className:'',iconSize:[40,40],iconAnchor:[20,20]});const pmk=L.marker([bin.lat,bin.lng],{icon:pIcon,zIndexOffset:2000}).addTo(layers.bins);pmk.bindPopup(`<div style="min-width:200px;font-family:system-ui"><b>🗑️ Nayi Disha Prototype</b><br/><span style="font-size:11px;color:#64748B">Bharat Mandapam · New Delhi</span><br/><br/><div style="height:5px;background:#eee;border-radius:3px"><div style="height:100%;width:${bin.level}%;background:${pc};border-radius:3px"></div></div><div style="font-size:12px;margin-top:4px;color:${pc};font-weight:700">${bin.level}% Full</div><div style="font-size:10px;color:#94A3B8;margin-top:4px">📡 Live sensor data</div></div>`,{maxWidth:220});if(onBinClickFn)pmk.on('click',()=>onBinClickFn(bin));return;}
const col=binColor(Math.max(bin.level,bin.bioLevel||0));
    const inR=routeBins.some(r=>r.id===bin.id);
    const ridx=routeBins.findIndex(r=>r.id===bin.id);
    const sz=inR?18:12;
    const html=inR?`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${col};border:2.5px solid #93C5FD;box-shadow:0 0 10px ${col};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:9px;font-family:monospace">${ridx+1}</div>`:`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${col};border:1.5px solid rgba(0,0,0,.4);box-shadow:0 0 ${bin.level>80?12:5}px ${col}88"></div>`;
    const icon=L.divIcon({html,className:'',iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});
    const mk=L.marker([bin.lat,bin.lng],{icon}).addTo(layers.bins);
    mk.bindPopup(`<div style="min-width:220px;font-family:system-ui,sans-serif;padding:2px"><div style="font-weight:800;font-size:13px;margin-bottom:3px">${esc(bin.name)}</div><div style="font-size:10px;color:#64748B;margin-bottom:10px">${esc(bin.area)} · ${esc(bin.ward)}</div><div style="margin-bottom:7px"><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="font-size:10px;font-weight:600;color:#3B82F6">♻️ Recyclable</span><span style="font-size:10px;font-weight:800;color:${binColor(bin.level)}">${bin.level}%</span></div><div style="height:5px;background:rgba(0,0,0,.08);border-radius:3px;overflow:hidden"><div style="height:100%;width:${bin.level}%;background:#3B82F6;border-radius:3px"></div></div></div><div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="font-size:10px;font-weight:600;color:#10B981">🌿 Biodegradable</span><span style="font-size:10px;font-weight:800;color:${binBioColor(bin.bioLevel||0)}">${bin.bioLevel||0}%</span></div><div style="height:5px;background:rgba(0,0,0,.08);border-radius:3px;overflow:hidden"><div style="height:100%;width:${bin.bioLevel||0}%;background:#10B981;border-radius:3px"></div></div></div><div style="font-size:10px;color:#94A3B8">${(bin.level>80||bin.bioLevel>80)?'🔴 Needs pickup':((bin.level>55||bin.bioLevel>55)?'🟡 Monitor':'🟢 Normal')}</div></div>`,{maxWidth:240});
    if(onBinClickFn)mk.on('click',()=>onBinClickFn(bin));
  });
  layers.hotspot.clearLayers();
  if(showHotspots)bins.filter(b=>b.level>65).forEach(b=>{const col=binColor(b.level);L.circle([b.lat,b.lng],{radius:b.level*14,fillColor:col,fillOpacity:b.level>80?.18:.07,color:col,weight:1,opacity:.4}).addTo(layers.hotspot);});
  layers.route.clearLayers();
  if(m.routingControl){try{map.removeControl(m.routingControl);}catch(e){}m.routingControl=null;}
  if(routeBins.length>1){
    routeBins.forEach((bin,i)=>{
      const icon=L.divIcon({html:`<div style="width:28px;height:28px;border-radius:50%;background:#1D4ED8;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;font-family:monospace;border:2.5px solid #93C5FD;box-shadow:0 0 10px #3B82F6AA">${i+1}</div>`,className:'',iconSize:[28,28],iconAnchor:[14,14]});
      L.marker([bin.lat,bin.lng],{icon,zIndexOffset:1000}).addTo(layers.route);
    });
    const waypoints=routeBins.map(b=>L.latLng(b.lat,b.lng));
    const rc=L.Routing.control({waypoints,routeWhileDragging:false,addWaypoints:false,lineOptions:{styles:[{color:'#60A5FA',opacity:0.9,weight:5}]},createMarker:()=>null,show:false,collapsible:false});
    rc.on('routesfound',e=>{if(!MAPS[id])return;const route=e.routes[0];const dist=(route.summary.totalDistance/1000).toFixed(1);const mins=Math.round(route.summary.totalTime/60);S.route.optMsg=`🛣️ Real road route: ${dist} km · ~${mins} min`;const bar=document.getElementById('route-summary');if(bar)bar.textContent=`Route: ${routeBins.length} stops · ${dist} km · ~${mins} min`;});
    rc.addTo(map);m.routingControl=rc;map.fitBounds(L.latLngBounds(waypoints),{padding:[50,50]});
  }
  layers.start.clearLayers();
  if(startPoint){const icon=L.divIcon({html:`<div style="width:36px;height:36px;border-radius:50%;background:#10B981;border:3px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px;font-family:monospace;box-shadow:0 0 14px #10B98188">S</div>`,className:'',iconSize:[36,36],iconAnchor:[18,18]});L.marker([startPoint.lat,startPoint.lng],{icon,zIndexOffset:2000}).bindPopup(`<div style="font-weight:700;font-family:system-ui">🚛 Start: ${esc(startPoint.name)}</div>`).addTo(layers.start);}
}

function flyToMap(id,lat,lng){const m=MAPS[id];if(m)m.map.flyTo([lat,lng],15,{duration:1});}
const mapLegendHTML=(startPoint=null)=>`<div style="position:absolute;top:10px;left:10px;z-index:500;display:flex;gap:6px;flex-wrap:wrap;pointer-events:none">${[['#EF4444','Critical (>80%)'],['#F59E0B','Medium (55–80%)'],['#10B981','Normal (<55%)']].map(([c,l])=>`<div style="display:flex;align-items:center;gap:5px;padding:4px 9px;background:rgba(255,255,255,.92);border-radius:7px;backdrop-filter:blur(8px);border:1px solid rgba(0,0,0,.08)"><div style="width:7px;height:7px;border-radius:50%;background:${c};box-shadow:0 0 5px ${c}"></div><span style="font-size:10px;color:var(--ink2);font-weight:600">${l}</span></div>`).join('')}${startPoint?`<div style="display:flex;align-items:center;gap:5px;padding:4px 9px;background:rgba(255,255,255,.92);border-radius:7px;border:1px solid rgba(16,185,129,.3)"><div style="width:7px;height:7px;border-radius:50%;background:#10B981"></div><span style="font-size:10px;color:#10B981">Start: ${esc(startPoint.name)}</span></div>`:''}</div>`;

async function classifyWaste(b64,mime="image/jpeg"){
  const key=(S.scan.apiKey||'').trim();
  if(!key)throw new Error('Please enter your Groq API key first.');
  const imgData=b64.includes(",")?b64.split(",")[1]:b64;
  const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},body:JSON.stringify({model:"meta-llama/llama-4-scout-17b-16e-instruct",max_tokens:512,temperature:0.1,messages:[{role:"user",content:[{type:"image_url",image_url:{url:`data:${mime};base64,${imgData}`}},{type:"text",text:`You are Nayi Disha, an AI waste classifier for Delhi, India.\nAnalyze this image and identify the waste item shown.\nRespond ONLY with a single valid JSON object — no markdown, no explanation, no code fences:\n{"item":"specific waste item name","category":"biodegradable|recyclable|hazardous|residual","confidence":85,"bin":"Green Bin (Biodegradable) or Blue Bin (Recyclable) or Red Bin (Hazardous) or Black Bin (Residual)","compartment":"Biodegradable Compartment or Recyclable Compartment","tip":"Delhi-specific tip: state which compartment to use and why","impact":"environmental impact note","points":10,"material":"primary material","recyclability_score":75,"biodegradability_score":40,"swachh_bharat":"Swachh Bharat Mission contribution"}`}]}]})});
  if(r.status===401)throw new Error('Invalid Groq key — check it at console.groq.com');
  if(r.status===429)throw new Error('Rate limit hit — wait a few seconds and try again');
  if(!r.ok){const t=await r.text().catch(()=>'');throw new Error(`Groq ${r.status}: ${JSON.parse(t||'{}')?.error?.message||t.slice(0,100)}`);}
  const d=await r.json();
  const raw=d?.choices?.[0]?.message?.content||'';
  if(!raw)throw new Error('Empty response from Groq');
  const clean=raw.trim().replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```\s*$/i,"").trim();
  const match=clean.match(/\{[\s\S]*\}/);
  if(!match)throw new Error('No JSON found in response');
  return JSON.parse(match[0]);
}

async function validateApiKey(){
  const key=(S.scan.apiKey||'').trim();
  if(!key){S.scan.keyStatus={state:'empty',msg:''};rerender();return;}
  S.scan.keyStatus={state:'checking',msg:''};rerender();
  try{
    const r=await fetch("https://api.groq.com/openai/v1/models",{headers:{"Authorization":`Bearer ${key}`}});
    if(r.status===401){S.scan.keyStatus={state:'invalid',msg:'Key not recognised by Groq — double-check you copied it fully.'};rerender();return;}
    if(!r.ok){S.scan.keyStatus={state:'invalid',msg:`Groq returned ${r.status} — try again.`};rerender();return;}
    const d=await r.json();
    const modelList=(d.data||[]).map(m=>m.id);
    const hasVision=modelList.some(m=>m.includes('llama-3.2'));
    S.scan.keyStatus={state:'valid',msg:`✓ Key valid — ${modelList.length} models available${hasVision?' · Llama Vision ✓':''}`};
  }catch(e){S.scan.keyStatus={state:'invalid',msg:`Network error: ${e.message}`};}
  rerender();
}

function chakraSVG(size=400,op=.04){const sp=Array.from({length:24},(_,i)=>{const a=(i/24)*360,r=(a*Math.PI)/180;return`<line x1="${(100+30*Math.cos(r)).toFixed(1)}" y1="${(100+30*Math.sin(r)).toFixed(1)}" x2="${(100+85*Math.cos(r)).toFixed(1)}" y2="${(100+85*Math.sin(r)).toFixed(1)}" stroke="#3B82F6" stroke-width="1.5"/>`;}).join('');return`<svg width="${size}" height="${size}" viewBox="0 0 200 200" style="opacity:${op};pointer-events:none"><circle cx="100" cy="100" r="90" fill="none" stroke="#3B82F6" stroke-width="2.5"/><circle cx="100" cy="100" r="30" fill="none" stroke="#3B82F6" stroke-width="2.5"/>${sp}<circle cx="100" cy="100" r="6" fill="#3B82F6"/></svg>`;}
function cpSVG(v,sz=78,sw=7,c="#EA580C",inner=""){const r=(sz-sw)/2,ci=2*Math.PI*r;return`<div style="position:relative;width:${sz}px;height:${sz}px;display:inline-flex;align-items:center;justify-content:center"><svg width="${sz}" height="${sz}" style="position:absolute;transform:rotate(-90deg)"><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="${sw}"/><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-dasharray="${ci}" stroke-dashoffset="${(ci-(v/100)*ci).toFixed(2)}" stroke-linecap="round"/></svg><div style="position:relative;z-index:1;text-align:center">${inner}</div></div>`;}
function mockQRSVG(value="ND",size=160){const cells=21;let seed=value.split("").reduce((a,c,i)=>a+c.charCodeAt(0)*(i*7+3),42);const rng=()=>{seed=(seed*1664525+1013904223)&0xffffffff;return(seed>>>0)/0xffffffff;};const g=Array.from({length:cells},()=>Array.from({length:cells},()=>rng()>0.48));const fp=(r,c)=>{for(let i=0;i<7;i++)for(let j=0;j<7;j++)g[r+i][c+j]=(i===0||i===6||j===0||j===6||(i>=2&&i<=4&&j>=2&&j<=4));};fp(0,0);fp(0,cells-7);fp(cells-7,0);for(let i=8;i<cells-8;i++){g[6][i]=i%2===0;g[i][6]=i%2===0;}const rects=g.map((row,i)=>row.map((cell,j)=>cell?`<rect x="${j}" y="${i}" width="1" height="1" fill="#F8F7F4"/>`:'').join('')).join('');return`<div style="background:white;padding:10px;border-radius:10px;display:inline-block;box-shadow:0 4px 16px rgba(0,0,0,.35)"><svg width="${size}" height="${size}" viewBox="0 0 ${cells} ${cells}"><rect width="${cells}" height="${cells}" fill="white"/>${rects}</svg></div>`;}
function anHTML(v,sx=""){return`<span class="an-counter" data-target="${parseFloat(String(v).replace(/[^0-9.]/g,""))||0}" data-suffix="${esc(sx)}">0</span>`;}
function sparkHTML(data,c="#EA580C",h=42){const mx=Math.max(...data),mn=Math.min(...data);const pts=data.map((v,i)=>`${(i/(data.length-1))*100},${h-((v-mn)/(mx-mn+.001))*h}`).join(" ");const id=`sg${Math.random().toString(36).slice(2,7)}`;return`<svg width="100%" height="${h}" viewBox="0 0 100 ${h}" preserveAspectRatio="none"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c}" stop-opacity=".3"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><polygon points="0,${h} ${pts} 100,${h}" fill="url(#${id})"/><polyline points="${pts}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;}
function runCounters(){document.querySelectorAll('.an-counter').forEach(el=>{const target=parseFloat(el.dataset.target)||0;const suffix=el.dataset.suffix||'';let start=null;const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/1400,1),e=1-Math.pow(1-p,4);el.textContent=Math.floor(e*target).toLocaleString('en-IN')+suffix;if(p<1)requestAnimationFrame(step);else el.textContent=target.toLocaleString('en-IN')+suffix;};requestAnimationFrame(step);});}

function blast(){const layer=document.getElementById('confetti-layer');const pieces=Array.from({length:55},(_,i)=>({left:Math.random()*100,delay:Math.random()*2,color:["#FF6B00","#10B981","#3B82F6","#F59E0B","#EC4899","#8B5CF6"][i%6],sz:6+Math.random()*10,rot:Math.random()*360,sh:Math.random()>.5?"50%":"2px",dur:2+Math.random()}));layer.innerHTML=pieces.map(p=>`<div style="position:absolute;left:${p.left}%;top:-20px;width:${p.sz}px;height:${p.sz}px;background:${p.color};border-radius:${p.sh};transform:rotate(${p.rot}deg);animation:confetti ${p.dur}s ${p.delay}s ease-in forwards"></div>`).join('');setTimeout(()=>layer.innerHTML='',5000);}

function renderLanding(){return`<div style="min-height:100vh;color:var(--ink)"><div class="tricolor"></div><nav style="display:flex;align-items:center;justify-content:space-between;padding:0 var(--pad);height:var(--nav-h);border-bottom:1px solid var(--border);position:sticky;top:3px;z-index:100;background:rgba(243,239,232,.88);backdrop-filter:blur(28px)"><div style="font-family:var(--fd);font-weight:600;font-size:22px;letter-spacing:-.5px"><em style="font-style:italic;color:var(--sf)">♻</em> नयी दिशा.</div><div style="display:flex;align-items:center;gap:24px"><span style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.16em">v4.3 · DELHI NCT</span><button class="btn btn-sf btn-sm" onclick="openAuth(null)">Enter Platform</button></div></nav><div style="min-height:92vh;display:flex;flex-direction:column;justify-content:center;padding:80px var(--pad) 60px;position:relative;overflow:hidden"><div style="max-width:var(--max-w);margin:0 auto;width:100%"><h1 class="fu1" style="font-family:var(--fd);font-size:clamp(4.8rem,13vw,15rem);font-weight:300;line-height:.88;letter-spacing:-4px;margin-bottom:clamp(28px,5vh,56px);max-width:1200px">Waste,<br/><em style="font-style:italic;color:var(--sf)">Reimagined</em><br/><span style="color:var(--ink3);font-weight:300">for Delhi.</span></h1><div class="fu2" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:32px"><p style="font-size:clamp(1rem,1.4vw,1.25rem);color:var(--ink2);max-width:520px;line-height:1.75;font-weight:300">AI-powered waste classification. Real-time IoT bin intelligence across 60 sensors. Route optimization for Delhi's garbage pickers. Municipality hotspot command.</p><div style="display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0"><button class="btn btn-sf btn-lg" onclick="openAuth('citizen')">Citizen Login</button><button class="btn btn-gh btn-lg" onclick="openAuth('collector')">Garbage Picker</button><button class="btn btn-gh btn-lg" onclick="openAuth('municipality')">Municipality</button><button class="btn btn-go btn-lg" onclick="openAuth('admin')">🔬 Admin</button><button class="btn btn-gh btn-lg" onclick="goPrototype()" style="border:2px solid rgba(200,75,10,.3);background:rgba(200,75,10,.05);color:var(--sf)">📡 Live Prototype</button></div></div></div><div style="position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;opacity:.4"><div style="font-family:var(--fm);font-size:9px;letter-spacing:.2em;color:var(--ink3)">SCROLL</div><div style="width:1px;height:40px;background:linear-gradient(var(--ink3),transparent)"></div></div></div><div style="border-top:1px solid var(--border);border-bottom:1px solid var(--border);height:48px;overflow:hidden;display:flex;align-items:center;background:rgba(253,251,248,.6);backdrop-filter:blur(8px)"><div style="display:flex;animation:marq 28s linear infinite;white-space:nowrap">${Array(2).fill(['60 IOT BINS','18 CRITICAL','GROQ LLAMA 4','REAL-TIME ROUTES','OSRM ROUTING','WASTECOINS','SWACHH BHARAT','DELHI NCT']).flat().map(t=>`<span style="font-family:var(--fm);font-size:10px;letter-spacing:.18em;color:var(--ink3);padding:0 36px">${t}</span><span style="color:var(--sf);font-size:8px;opacity:.6">◆</span>`).join('')}</div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);background:rgba(253,251,248,.7);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)">${[{n:'60',l:'IoT bins across Delhi',c:'var(--sf)'},{n:'20',l:'Real neighborhoods',c:'var(--gr)'},{n:'4',l:'Stakeholder roles',c:'var(--bl)'},{n:'∞',l:'WasteCoins earned',c:'var(--go)'}].map((s,i)=>`<div style="padding:clamp(32px,6vh,72px) var(--pad);${i<3?'border-right:1px solid var(--border)':''}"><div style="font-family:var(--fd);font-size:clamp(3.5rem,7vw,7rem);font-weight:300;color:${s.c};letter-spacing:-4px;line-height:.9;margin-bottom:14px">${s.n}</div><div style="font-family:var(--fm);font-size:11px;color:var(--ink3);letter-spacing:.1em">${s.l.toUpperCase()}</div></div>`).join('')}</div><div style="padding:clamp(60px,10vh,120px) var(--pad)"><div style="max-width:var(--max-w);margin:0 auto"><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.2em;margin-bottom:clamp(40px,7vh,80px);display:flex;align-items:center;gap:14px">THE PLATFORM<span style="flex:1;height:1px;background:var(--border)"></span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border)">${[{role:'citizen',icon:'🏠',title:'Citizen',italic:'living',accent:'var(--sf)',num:'01',desc:'Scan waste with AI, earn WasteCoins, verify at bin, redeem for real government perks — BSES, DTC, LPG.',features:['Groq Llama 4 Vision AI','GPS nearest 6 bins','60-min QR verification','Real government redemption']},{role:'collector',icon:'🚛',title:'Garbage Picker',italic:'routing',accent:'var(--bl)',num:'02',desc:'TSP-optimized routes, live bin telemetry, real road navigation via OSRM — the whole city at a glance.',features:['Nearest-neighbor TSP','Real road routing','Critical bin prioritization','Fleet ops dashboard']},{role:'municipality',icon:'🏛️',title:'Municipality',italic:'commanding',accent:'#6D28D9',num:'03',desc:"Hotspot clusters, ward analytics, dispatch commands — full visibility over Delhi's waste landscape.",features:['1.8km hotspot clustering','Ward fill analytics','Critical dispatch table','Live IoT command map']},{role:'admin',icon:'🔬',title:'Admin',italic:'analyzing',accent:'var(--go)',num:'04',desc:'City-wide KPIs, EPR compliance tracking, carbon offset metrics — the full picture.',features:['City-wide intelligence','EPR tonnage tracking','Carbon credit metrics','Unrestricted access']}].map(r=>`<div onclick="openAuth('${r.role}')" style="background:rgba(253,251,248,.85);backdrop-filter:blur(8px);padding:clamp(40px,6vw,72px);cursor:pointer;transition:background .18s,transform .18s;position:relative;overflow:hidden" onmouseenter="this.style.background='rgba(243,239,232,.95)'" onmouseleave="this.style.background='rgba(253,251,248,.85)'"><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.14em;margin-bottom:24px">${r.num}</div><div style="font-size:36px;margin-bottom:20px">${r.icon}</div><h3 style="font-family:var(--fd);font-size:clamp(2rem,3.5vw,3.5rem);font-weight:400;line-height:.95;margin-bottom:20px;letter-spacing:-2px">${r.title}<br/><em style="font-style:italic;color:${r.accent}">${r.italic}.</em></h3><p style="font-size:15px;color:var(--ink2);line-height:1.7;margin-bottom:28px;max-width:360px">${r.desc}</p><div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px">${r.features.map(f=>`<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--ink2)"><span style="width:16px;height:1px;background:${r.accent};flex-shrink:0"></span>${f}</div>`).join('')}</div><div style="font-family:var(--fm);font-size:11px;color:${r.accent};letter-spacing:.08em">Enter as ${r.title} →</div><div style="position:absolute;bottom:-20px;right:-20px;width:120px;height:120px;border-radius:50%;background:${r.accent};opacity:.04"></div></div>`).join('')}</div></div></div><div style="border-top:1px solid var(--border);padding:clamp(48px,8vh,96px) var(--pad);background:rgba(243,239,232,.7);backdrop-filter:blur(12px)"><div style="max-width:var(--max-w);margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:48px;flex-wrap:wrap"><div style="max-width:600px"><div style="font-family:var(--fd);font-size:clamp(2rem,4vw,4.5rem);font-weight:300;letter-spacing:-3px;line-height:.9;margin-bottom:32px;color:var(--ink)">The city that<br/><em style="font-style:italic;color:var(--sf)">sorts itself.</em></div><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);margin-bottom:16px">$ nayidisha --city="Delhi" --init</div>${['→ 60 bin sensors online','→ AI classifier: Groq Llama 4 Scout','→ Routing: OSRM + Leaflet LRM','→ WasteCoins economy: active'].map(l=>`<div style="font-family:var(--fm);font-size:13px;color:var(--ink2);margin-bottom:8px">${l}</div>`).join('')}<div style="font-family:var(--fm);font-size:13px;color:var(--sf);margin-top:12px" class="cursor">Ready for Delhi.</div></div><div><div style="font-family:var(--fd);font-size:clamp(1.5rem,2.5vw,2.5rem);font-weight:400;letter-spacing:-1px;color:var(--ink);margin-bottom:8px"><em style="font-style:italic;color:var(--sf)">♻</em> नयी दिशा.</div><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.1em;margin-bottom:4px">MoHUA · MCD DELHI · SWACHH BHARAT</div><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.08em">© 2026 NAYI DISHA</div></div></div></div></div>`;}

function renderAuthModal(){
  const{authSignup:signup,authRole:role,authForm:af}=S;
  const roles=[{v:"citizen",icon:"🏠",l:"Citizen"},{v:"collector",icon:"🚛",l:"Collector"},{v:"municipality",icon:"🏛️",l:"Municipality"},{v:"admin",icon:"🔬",l:"Admin"}];
  return`<div style="position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:900;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);overflow-y:auto;padding:20px" onclick="if(event.target===this)closeAuth()"><div style="background:var(--s1);border:1px solid var(--border2);padding:40px;width:100%;max-width:480px;position:relative;border-radius:16px;box-shadow:var(--shadow-lg)" onclick="event.stopPropagation()"><div class="tricolor" style="position:absolute;top:0;left:0;right:0;border-radius:16px 16px 0 0"></div><button onclick="closeAuth()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:var(--ink3);font-size:20px;cursor:pointer">×</button><div style="margin-bottom:22px;margin-top:8px"><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.14em;margin-bottom:10px">${signup?'CREATE ACCOUNT':'SIGN IN'}</div><h2 style="font-family:var(--fd);font-weight:600;font-size:26px;letter-spacing:-1px">${signup?'Join नयी दिशा':'Welcome back.'}</h2></div><div style="display:flex;border:1px solid var(--border2);border-radius:8px;overflow:hidden;margin-bottom:22px">${["Sign Up","Sign In"].map((t,i)=>`<button onclick="S.authSignup=${i===0};S.authForm={name:'',contact:'',password:'',secQ:'',secA:'',err:''};rerender()" style="flex:1;padding:10px;border:none;font-family:var(--fd);font-weight:600;font-size:13px;cursor:pointer;transition:all .15s;${(signup&&i===0)||(!signup&&i===1)?'background:var(--sf);color:#fff':'background:transparent;color:var(--ink3)'}">${t}</button>`).join('')}</div><div style="margin-bottom:18px"><div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.12em;margin-bottom:10px">SELECT ROLE</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${roles.map(r=>`<div onclick="S.authRole='${r.v}';rerender()" style="padding:11px;text-align:center;cursor:pointer;border:1px solid ${role===r.v?'var(--sf)':'var(--border)'};border-radius:10px;background:${role===r.v?'rgba(200,75,10,.06)':'transparent'};transition:all .14s"><div style="font-size:18px;margin-bottom:3px">${r.icon}</div><div style="font-weight:600;font-size:12px;color:${role===r.v?'var(--sf)':'var(--ink2)'}">${r.l}</div></div>`).join('')}</div></div><div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">${signup?`<input placeholder="Full Name *" value="${esc(af&&af.name||'')}" oninput="S.authForm.name=this.value" style="padding:12px 14px;font-size:14px"/>`:''}  <input placeholder="Phone number or email *" type="text" value="${esc(af&&af.contact||'')}" oninput="S.authForm.contact=this.value" style="padding:12px 14px;font-size:14px" autocomplete="username"/><input type="password" placeholder="Password (min 6 chars) *" value="${esc(af&&af.password||'')}" oninput="S.authForm.password=this.value" style="padding:12px 14px;font-size:14px" autocomplete="${signup?'new-password':'current-password'}"/></div>${signup?`<div style="display:flex;flex-direction:column;gap:8px;margin-top:6px"><select onchange="S.authForm.secQ=this.value" style="padding:12px 14px;font-size:14px"><option value="" disabled ${!(af&&af.secQ)?'selected':''}>🔒 Security Question *</option><option value="fav_movie" ${af&&af.secQ==='fav_movie'?'selected':''}>Favourite movie?</option><option value="first_car" ${af&&af.secQ==='first_car'?'selected':''}>First car?</option><option value="mothers_maiden" ${af&&af.secQ==='mothers_maiden'?'selected':''}>Mother's maiden name?</option><option value="childhood_nick" ${af&&af.secQ==='childhood_nick'?'selected':''}>Childhood nickname?</option><option value="fav_food" ${af&&af.secQ==='fav_food'?'selected':''}>Favourite food?</option><option value="first_school" ${af&&af.secQ==='first_school'?'selected':''}>First school name?</option><option value="birth_city" ${af&&af.secQ==='birth_city'?'selected':''}>Birth city?</option></select><input placeholder="Security answer *" value="${esc(af&&af.secA||'')}" oninput="S.authForm.secA=this.value" style="padding:12px 14px;font-size:14px"/></div>`:''}${(af&&af.err)?`<div style="background:rgba(185,28,28,.07);border:1px solid rgba(185,28,28,.2);border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:13px;color:var(--rd)">${esc(af.err)}</div>`:''}<button class="btn btn-sf" onclick="${signup?'doSignup':'doLogin'}()" style="width:100%;justify-content:center;padding:14px;font-size:15px">${signup?'Create Account →':'Sign In →'}</button><div style="text-align:center;margin-top:14px;font-size:13px;color:var(--ink3)">${signup?`Have an account? <span onclick="S.authSignup=false;S.authForm={};rerender()" style="color:var(--sf);cursor:pointer;font-weight:600">Sign In</span>`:`New here? <span onclick="S.authSignup=true;S.authForm={};rerender()" style="color:var(--sf);cursor:pointer;font-weight:600">Sign Up</span>`}</div></div></div>`;}

function doSignup(){if(!S.authForm)S.authForm={};const af=S.authForm;if(!(af.name||'').trim()){S.authForm.err='Full name is required';rerender();return;}if(!(af.contact||'').trim()){S.authForm.err='Phone number or email is required';rerender();return;}if((af.password||'').length<6){S.authForm.err='Password must be at least 6 characters';rerender();return;}if(!(af.secQ||'').trim()){S.authForm.err='Please select a security question';rerender();return;}if((af.secA||'').trim().length<2){S.authForm.err='Please provide a security answer';rerender();return;}const res=registerUser({name:af.name.trim(),contact:af.contact.trim().toLowerCase(),password:af.password,securityQuestion:af.secQ||'',securityAnswer:(af.secA||'').trim().toLowerCase(),role:S.authRole});if(res.err){S.authForm.err=res.err;rerender();return;}S.currentUser=res.user;S.role=res.user.role;S.cPts=0;_enterApp();}
function doLogin(){if(!S.authForm)S.authForm={};const af=S.authForm;if(!(af.contact||'').trim()||!af.password){S.authForm.err='Enter phone/email and password';rerender();return;}const user=findUser(af.contact.trim(),af.password);if(!user){S.authForm.err='Invalid credentials — check phone/email and password';rerender();return;}S.currentUser=user;S.role=user.role;S.cPts=user.pts||0;_enterApp();}
function _enterApp(){S.screen='app';S.showAuth=false;S.authForm={name:'',contact:'',password:'',secQ:'',secA:'',err:''};S.page=S.role==='municipality'?'muni':S.role==='admin'?'admin':'dashboard';S.showLoc=(S.role==='citizen'||S.role==='collector');blast();rerender();}

function renderLocationModal(){const{locMode:mode,locSel:sel,locSearch:search,locGps:gps}=S;const filtered=DELHI_AREAS.filter(a=>a.name.toLowerCase().includes(search.toLowerCase()));return`<div style="position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:800;display:flex;align-items:center;justify-content:center"><div style="background:var(--s1);border:1px solid var(--border2);padding:48px;width:100%;max-width:480px;position:relative"><div class="tricolor" style="position:absolute;top:0;left:0;right:0"></div><div style="margin-bottom:24px;margin-top:8px"><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.12em;margin-bottom:8px">LOCATION</div><h2 style="font-family:var(--fd);font-weight:700;font-size:22px;letter-spacing:-1px;margin-bottom:4px">Where in Delhi?</h2><p style="font-size:14px;color:var(--ink3)">We'll show nearest bins on the live map</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);margin-bottom:18px"><div onclick="S.locMode='area';rerender()" style="padding:16px;text-align:center;cursor:pointer;background:${mode==='area'?'rgba(255,107,26,.06)':'var(--s1)'}"><div style="font-size:22px;margin-bottom:5px">🗺️</div><div style="font-weight:600;font-size:12px;color:${mode==='area'?'var(--sf)':'var(--ink2)'}">Pick Area</div>${mode==='area'?`<div style="width:20px;height:1px;background:var(--sf);margin:5px auto 0"></div>`:''}</div><div onclick="locGPS()" style="padding:16px;text-align:center;cursor:pointer;background:${mode==='gps'?'rgba(0,200,150,.06)':'var(--s1)'}"><div style="font-size:22px;margin-bottom:5px">🛰️</div><div style="font-weight:600;font-size:12px;color:${mode==='gps'?'var(--gr)':'var(--ink2)'}">Use GPS</div>${mode==='gps'?`<div style="width:20px;height:1px;background:var(--gr);margin:5px auto 0"></div>`:''}</div></div>${mode==='area'?`<input placeholder="Search area…" value="${esc(search)}" oninput="S.locSearch=this.value;rerender()" style="margin-bottom:8px"/><div style="max-height:200px;overflow-y:auto;margin-bottom:14px;border:1px solid var(--border2)">${filtered.map(a=>`<div onclick="S.locSel=${JSON.stringify(a).replace(/"/g,"'")};rerender()" style="padding:9px 13px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);background:${sel.id===a.id?'rgba(255,107,26,.06)':'transparent'}"><div><div style="font-weight:600;font-size:12px;color:${sel.id===a.id?'var(--sf)':'var(--ink)'}">${esc(a.name)}</div><div style="font-size:10px;color:var(--ink3)">${esc(a.ward)}</div></div>${sel.id===a.id?`<span style="color:var(--sf);font-family:var(--fm);font-size:12px">✓</span>`:''}</div>`).join('')}</div>`:''}<button class="btn btn-sf" onclick="confirmLocation()" style="width:100%;justify-content:center">Find Bins Near ${esc(sel.name)} →</button></div></div>`;}

function renderTopNav(){const{role,page,cPts,pPts,pSess,userArea}=S;const navItems={citizen:[{p:"dashboard",l:"Dashboard"},{p:"scan",l:"AI Scan"},{p:"iot",l:"IoT Bins"},{p:"rewards",l:"Rewards"},{p:"settings",l:"Settings"}],collector:[{p:"dashboard",l:"Fleet Ops"},{p:"route",l:"♻️ Recycle Route",extra:"recycle"},{p:"route",l:"🌿 Bio Route",extra:"bio"},{p:"iot",l:"IoT Bins"},{p:"settings",l:"Settings"}],municipality:[{p:"muni",l:"Hotspot Command"},{p:"iot",l:"IoT Bins"},{p:"settings",l:"Settings"}],admin:[{p:"dashboard",l:"Analytics"},{p:"iot",l:"IoT Bins"},{p:"settings",l:"Settings"}],prototype:[{p:"prototype",l:"📡 Live Bin"},{p:"settings",l:"Settings"}]};const items=navItems[role]||navItems.citizen;return`<div><div class="tricolor"></div><nav class="topnav"><div class="topnav-logo" onclick="navigate('dashboard')"><em style="font-style:italic;color:var(--sf)">♻</em> नयी दिशा.</div><div class="topnav-nav">${items.map(it=>`<div class="nav-item${(page===it.p&&(!it.extra||(S.route.routeTab||'recycle')===it.extra))?' active':''}" onclick="${it.extra?`navigate('${it.p}');S.route.routeTab='${it.extra}';rerender()`:`navigate('${it.p}')`}">${it.l}</div>`).join('')}</div><div class="topnav-right">${userArea?`<div onclick="openLocModal()" style="display:flex;align-items:center;gap:6px;padding:7px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer;background:rgba(255,255,255,.7);font-size:13px;color:var(--ink2)"><span style="font-size:14px">📍</span><span style="font-weight:500">${esc(userArea.name)}</span></div>`:''} ${pPts>0?`<div onclick="gotoPendingSession()" style="display:flex;align-items:center;gap:6px;padding:7px 14px;border:1px solid rgba(146,64,14,.22);border-radius:8px;cursor:pointer;background:rgba(146,64,14,.06)"><span style="font-size:14px">⏳</span><span style="font-family:var(--fm);font-weight:600;color:var(--go);font-size:12px">+${pPts}</span></div>`:''} ${role!=='municipality'?`<div style="display:flex;align-items:center;gap:8px;padding:8px 18px;border:1px solid var(--border);border-radius:8px;background:var(--s1);box-shadow:var(--shadow)"><span style="font-size:16px">⭐</span><span style="font-family:var(--fd);font-weight:700;color:var(--sf);font-size:17px;letter-spacing:-.5px">${cPts.toLocaleString('en-IN')}</span></div>`:''} ${role==='citizen'?`<button class="btn btn-sf btn-sm" onclick="navigate('scan')">📷 Scan</button>`:''} ${role==='collector'?`<button class="btn btn-bl btn-sm" onclick="navigate('route');S.route.routeTab='recycle';rerender()">♻️ Recycle</button><button class="btn btn-gr btn-sm" onclick="navigate('route');S.route.routeTab='bio';rerender()">🌿 Bio</button>`:''} ${role==='municipality'?`<button class="btn btn-pu btn-sm" onclick="navigate('muni')">🔥 Hotspots</button>`:''}<div onclick="navigate('settings')" style="width:38px;height:38px;background:var(--sf);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-weight:700;cursor:pointer;font-size:15px;color:#fff;box-shadow:var(--shadow);flex-shrink:0">${(S.currentUser?.name||'U')[0].toUpperCase()}</div></div></nav></div>`;}

function renderCitizenDash(){const{cPts,pPts,pSess,userArea}=S;const nearby=userArea?nearbyBins(userArea.lat,userArea.lng,6):DELHI_BINS.slice(0,6);const critCount=DELHI_BINS.filter(b=>b.level>80).length;return`<div><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;flex-wrap:wrap;gap:20px"><div><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.18em;margin-bottom:16px;font-weight:500">CITIZEN DASHBOARD</div><h1 class="fu" style="font-family:var(--fd);font-size:clamp(4rem,9vw,9rem);font-weight:300;letter-spacing:-4px;line-height:.88;color:var(--ink);margin-bottom:20px">${S.currentUser?`नमस्ते,<br/><em style="font-style:italic;color:var(--sf)">${esc(S.currentUser.name.split(" ")[0])}.</em>`:"नमस्ते!"}</h1><p class="fu1" style="font-size:16px;color:var(--ink2);line-height:1.6">${userArea?`📍 ${esc(userArea.name)}, ${esc(userArea.ward)}`:'Set your location to discover nearby bins'}</p></div><button class="btn btn-sf btn-lg" onclick="navigate('scan')" style="gap:10px;align-self:flex-end"><span style="font-size:20px">📷</span> Scan Waste Now</button></div><div class="fu1" style="margin-bottom:56px"><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.18em;margin-bottom:24px;display:flex;align-items:center;gap:12px">YOUR IMPACT<span style="flex:1;height:1px;background:var(--border)"></span></div><div class="g4">${[{v:47,sx:" kg",l:"Waste Sorted",c:"var(--gr)",icon:"♻️"},{v:18,sx:" kg",l:"CO₂ Saved",c:"var(--bl)",icon:"🌱"},{v:138,sx:"",l:"Total Scans",c:"var(--ink)",icon:"📷"},{v:cPts,sx:"",l:"WasteCoins",c:"var(--sf)",icon:"⭐"}].map(s=>`<div class="sc"><div style="font-size:28px;margin-bottom:18px">${s.icon}</div><div style="font-family:var(--fd);font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${s.c};letter-spacing:-2px;line-height:1;margin-bottom:12px">${anHTML(s.v,s.sx)}</div><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.12em">${s.l.toUpperCase()}</div></div>`).join('')}</div></div><div class="fu2" style="margin-bottom:56px"><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:12px"><div><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.18em;margin-bottom:8px">NEAREST BINS</div><div style="font-family:var(--fd);font-size:26px;font-weight:700">${userArea?esc(userArea.name):'Delhi Overview'}</div></div><button class="btn btn-gh" onclick="openLocModal()">Change Location</button></div><div style="position:relative;overflow:hidden;border-radius:16px;border:1px solid var(--border);box-shadow:var(--shadow-md)">${mapLegendHTML()}<div id="map-citizen" style="height:520px"></div></div></div><div class="fu3"><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.18em;margin-bottom:24px;display:flex;align-items:center;gap:12px">CRITICAL BINS<span style="flex:1;height:1px;background:var(--border)"></span><span class="badge bd-rd">${critCount} live</span></div><div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:var(--shadow)"><table><thead><tr><th>Bin Name</th><th>Area</th><th>Fill Level</th><th>Type</th></tr></thead><tbody>${DELHI_BINS.filter(b=>b.level>80).sort((a,b)=>b.level-a.level).slice(0,7).map(b=>{const col=binColor(b.level);return`<tr><td style="font-weight:600">${esc(b.name)}</td><td style="color:var(--ink2)">${esc(b.area)}</td><td><div style="display:flex;flex-direction:column;gap:5px;min-width:140px"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:9px;color:#3B82F6;font-family:var(--fm)">♻️</span><div style="flex:1;height:3px;background:var(--s3);border-radius:2px"><div style="height:100%;width:${b.level}%;background:#3B82F6;border-radius:2px"></div></div><span style="font-family:var(--fm);font-size:11px;color:#3B82F6;font-weight:600">${b.level}%</span></div><div style="display:flex;align-items:center;gap:8px"><span style="font-size:9px;color:#10B981;font-family:var(--fm)">🌿</span><div style="flex:1;height:3px;background:var(--s3);border-radius:2px"><div style="height:100%;width:${b.bioLevel||0}%;background:#10B981;border-radius:2px"></div></div><span style="font-family:var(--fm);font-size:11px;color:#10B981;font-weight:600">${b.bioLevel||0}%</span></div></div></td><td><span class="badge ${b.type==='Recyclable'?'bd-bl':b.type==='Hazardous'?'bd-go':'bd-sf'}">${esc(b.type)}</span></td></tr>`;}).join('')}</tbody></table></div></div></div>`;}

function renderCollectorDash(){const{collectorRoute:rR,collectorBioRoute:rB,userArea}=S;const critR=DELHI_BINS.filter(b=>b.level>80);const critB=DELHI_BINS.filter(b=>(b.bioLevel||0)>80);const dR=rR.length>1?routeDist(rR).toFixed(1):0;const dB=rB.length>1?routeDist(rB).toFixed(1):0;return`<div><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:40px;flex-wrap:wrap;gap:20px;padding-bottom:36px;border-bottom:1px solid var(--border)"><div><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.18em;margin-bottom:16px;font-weight:500">FLEET OPERATIONS</div><h1 style="font-family:var(--fd);font-size:clamp(3rem,6vw,6rem);font-weight:300;letter-spacing:-3px;line-height:.9;color:var(--ink);margin-bottom:14px">Dual Fleet<br/><em style="font-style:italic;color:var(--bl)">Intelligence.</em></h1><p style="color:var(--ink2);font-size:16px;line-height:1.6">${userArea?`📍 ${esc(userArea.name)}`:''} · Two truck fleets operating independently</p></div><button class="btn btn-bl btn-lg" onclick="navigate('route')" style="align-self:flex-end">🚛 Plan Routes</button></div><div class="g2" style="margin-bottom:40px"><div style="background:rgba(59,130,246,.04);border:2px solid rgba(59,130,246,.18);border-radius:20px;padding:28px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:20px"><div style="width:44px;height:44px;background:rgba(59,130,246,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px">♻️</div><div><div style="font-family:var(--fm);font-size:9px;color:#3B82F6;letter-spacing:.18em">BLUE TRUCK FLEET</div><div style="font-family:var(--fd);font-size:20px;font-weight:700;color:var(--ink)">Recyclable Route</div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">${[{v:rR.length||'—',l:'Bins Planned',c:'#3B82F6'},{v:rR.length>1?dR+' km':'—',l:'Distance',c:'var(--gr)'},{v:critR.length,l:'Critical Bins',c:'var(--rd)'},{v:'DL-01-BL',l:'Truck ID',c:'#3B82F6'}].map(s=>`<div class="sc" style="padding:16px 14px"><div style="font-family:var(--fm);font-weight:800;font-size:18px;color:${s.c}">${typeof s.v==='number'?anHTML(s.v):esc(String(s.v))}</div><div style="font-size:11px;color:var(--ink3);margin-top:2px">${s.l}</div></div>`).join('')}</div><button class="btn btn-bl" onclick="navigate('route');S.route.routeTab='recycle';rerender()" style="width:100%;justify-content:center">♻️ Manage Recyclable Route</button></div><div style="background:rgba(16,185,129,.04);border:2px solid rgba(16,185,129,.18);border-radius:20px;padding:28px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:20px"><div style="width:44px;height:44px;background:rgba(16,185,129,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px">🌿</div><div><div style="font-family:var(--fm);font-size:9px;color:#10B981;letter-spacing:.18em">GREEN TRUCK FLEET</div><div style="font-family:var(--fd);font-size:20px;font-weight:700;color:var(--ink)">Biodegradable Route</div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">${[{v:rB.length||'—',l:'Bins Planned',c:'#10B981'},{v:rB.length>1?dB+' km':'—',l:'Distance',c:'var(--gr)'},{v:critB.length,l:'Critical Bins',c:'var(--rd)'},{v:'DL-02-GR',l:'Truck ID',c:'#10B981'}].map(s=>`<div class="sc" style="padding:16px 14px"><div style="font-family:var(--fm);font-weight:800;font-size:18px;color:${s.c}">${typeof s.v==='number'?anHTML(s.v):esc(String(s.v))}</div><div style="font-size:11px;color:var(--ink3);margin-top:2px">${s.l}</div></div>`).join('')}</div><button class="btn btn-gr" onclick="navigate('route');S.route.routeTab='bio';rerender()" style="width:100%;justify-content:center">🌿 Manage Biodegradable Route</button></div></div><div class="g2"><div class="card"><h3 style="font-family:var(--fd);font-size:18px;font-weight:700;margin-bottom:16px;color:#3B82F6">♻️ Recyclable Critical Queue</h3><table><thead><tr><th>Bin</th><th>Area</th><th>Fill</th><th>Route</th></tr></thead><tbody>${critR.sort((a,b)=>b.level-a.level).slice(0,6).map((b,i)=>{const inR=rR.findIndex(r=>r.id===b.id);return`<tr><td style="font-weight:700;font-size:12px">${esc(b.name)}</td><td style="font-size:11px;color:var(--ink2)">${esc(b.area)}</td><td><span style="font-family:var(--fm);font-size:12px;color:#3B82F6;font-weight:700">${b.level}%</span></td><td>${inR>=0?`<span class="badge bd-bl" style="font-size:9px">#${inR+1}</span>`:`<span style="font-size:10px;color:var(--ink3)">—</span>`}</td></tr>`;}).join('')}</tbody></table></div><div class="card"><h3 style="font-family:var(--fd);font-size:18px;font-weight:700;margin-bottom:16px;color:#10B981">🌿 Biodegradable Critical Queue</h3><table><thead><tr><th>Bin</th><th>Area</th><th>Bio Fill</th><th>Route</th></tr></thead><tbody>${critB.sort((a,b)=>(b.bioLevel||0)-(a.bioLevel||0)).slice(0,6).map((b,i)=>{const inB=rB.findIndex(r=>r.id===b.id);return`<tr><td style="font-weight:700;font-size:12px">${esc(b.name)}</td><td style="font-size:11px;color:var(--ink2)">${esc(b.area)}</td><td><span style="font-family:var(--fm);font-size:12px;color:#10B981;font-weight:700">${b.bioLevel||0}%</span></td><td>${inB>=0?`<span class="badge bd-gr" style="font-size:9px">#${inB+1}</span>`:`<span style="font-size:10px;color:var(--ink3)">—</span>`}</td></tr>`;}).join('')}</tbody></table></div></div></div>`;}

function renderMuniDashboard(){const{muni:mu}=S;const wards=[...new Set(DELHI_BINS.map(b=>b.ward))].sort();const critBins=DELHI_BINS.filter(b=>b.level>80);const medBins=DELHI_BINS.filter(b=>b.level>55&&b.level<=80);const okBins=DELHI_BINS.filter(b=>b.level<=55);const hotType=mu.hotspotType||'recycle';const hotBins=hotType==='recycle'?DELHI_BINS.filter(b=>isRecycleHotspot(b)).sort((a,b)=>recycleHotspotScore(b)-recycleHotspotScore(a)):DELHI_BINS.filter(b=>isBioHotspot(b)).sort((a,b)=>bioHotspotScore(b)-bioHotspotScore(a));const hotBinsR=DELHI_BINS.filter(b=>isRecycleHotspot(b));const hotBinsB=DELHI_BINS.filter(b=>isBioHotspot(b));const hotspots=[];const used=new Set();hotBins.forEach(bin=>{if(used.has(bin.id))return;const cl=hotBins.filter(b=>!used.has(b.id)&&haversine(bin.lat,bin.lng,b.lat,b.lng)<2.0);cl.forEach(b=>used.add(b.id));const avgScore=Math.round(cl.reduce((s,b)=>s+hotspotScore(b),0)/cl.length);hotspots.push({bins:cl,lat:cl.reduce((s,b)=>s+b.lat,0)/cl.length,lng:cl.reduce((s,b)=>s+b.lng,0)/cl.length,severity:avgScore>=80?'🔴 High Priority':avgScore>=70?'🟡 Medium Priority':'⚠️ Watch Zone',score:avgScore});});const wardStats=wards.map(w=>{const wb=DELHI_BINS.filter(b=>b.ward===w);return{ward:w,total:wb.length,critical:wb.filter(b=>b.level>80).length,avg:Math.round(wb.reduce((s,b)=>s+b.level,0)/wb.length)};}).sort((a,b)=>b.critical-a.critical);return`<div><div style="background:linear-gradient(135deg,rgba(139,92,246,.12),rgba(59,130,246,.07));border:1px solid rgba(139,92,246,.25);border-radius:20px;padding:22px;margin-bottom:22px"><div style="font-family:var(--fd);font-size:10px;color:#A78BFA;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px">🏛️ Municipality Command Centre · Delhi</div><h1 style="font-family:var(--fd);font-size:22px;font-weight:900;letter-spacing:-.5px;margin-bottom:9px">Waste Hotspot Intelligence</h1><div style="display:flex;gap:9px;flex-wrap:wrap"><span class="badge bd-rd">🔴 ${critBins.length} Critical</span><span class="badge bd-go">🟡 ${medBins.length} Medium</span><span class="badge bd-gr">🟢 ${okBins.length} Normal</span><span class="badge bd-pu">🏛️ ${wards.length} Wards</span><span class="badge bd-bl">📡 ${DELHI_BINS.length} Bins Live</span></div></div><div class="g4" style="margin-bottom:32px">${[{v:DELHI_BINS.length,l:"Total Monitored",icon:"📡",c:"#93C5FD"},{v:critBins.length,l:"Critical Now",icon:"🔴",c:"var(--rd)"},{v:Math.round(DELHI_BINS.reduce((s,b)=>s+b.level,0)/DELHI_BINS.length),l:"Avg City Fill %",icon:"📊",c:"var(--sf)",sx:"%"},{v:hotBinsR.length,l:"♻️ Recycle Hotspots",icon:"♻️",c:"#3B82F6"},{v:hotBinsB.length,l:"🌿 Bio Hotspots",icon:"🌿",c:"#10B981"}].map(s=>`<div class="sc"><div style="font-size:28px;margin-bottom:16px">${s.icon}</div><div style="font-family:var(--fm);font-weight:800;font-size:19px;color:${s.c}">${anHTML(s.v,s.sx||'')}</div><div style="font-size:13px;color:var(--ink3);margin-top:3px">${s.l}</div></div>`).join('')}</div><div class="card" style="margin-bottom:24px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;flex-wrap:wrap;gap:9px"><h3 style="font-family:var(--fd);font-size:19px;font-weight:700">Delhi Hotspot Map</h3><div style="display:flex;gap:7px;flex-wrap:wrap">${[['hotspot','🔥 Hotspots'],['all','All Bins'],['ward','Ward View']].map(([v,l])=>`<button class="btn btn-xs ${mu.mapMode===v?'btn-pu':'btn-gh'}" onclick="setMuniMode('${v}')">${l}</button>`).join('')+`<div style="display:flex;gap:4px;background:var(--s2);padding:3px;border-radius:8px">`+[['recycle','♻️'],['bio','🌿']].map(([v,l])=>`<button onclick="S.muni.hotspotType='${v}';rerender()" style="padding:4px 10px;border:none;border-radius:6px;font-size:12px;cursor:pointer;background:${mu.hotspotType===v||(!mu.hotspotType&&v==='recycle')?'white':'transparent'};">${l}</button>`).join('')+`</div>`}<select onchange="setMuniWard(this.value)" style="font-size:11px;padding:4px 9px;width:auto"><option value="all"${mu.selWard==='all'?' selected':''}>All Wards</option>${wards.map(w=>`<option value="${esc(w)}"${mu.selWard===w?' selected':''}>${esc(w)}</option>`).join('')}</select></div></div><div style="position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--border2)">${mapLegendHTML()}<div id="map-muni" style="height:520px"></div></div></div><div class="card"><h3 style="font-family:var(--fd);font-size:20px;font-weight:700;margin-bottom:20px">🚨 Critical Alert Queue</h3><div style="overflow-x:auto"><table><thead><tr><th>Bin</th><th>Area / Ward</th><th>Fill</th><th>Type</th><th>Action</th></tr></thead><tbody>${critBins.sort((a,b)=>b.level-a.level).slice(0,10).map(b=>{const col=binColor(b.level);return`<tr><td style="font-weight:700;font-size:12px">${esc(b.name)}</td><td style="font-size:13px;color:var(--ink2)">${esc(b.area)} · ${esc(b.ward)}</td><td><div style="display:flex;flex-direction:column;gap:4px;min-width:110px"><div style="display:flex;align-items:center;gap:6px"><span style="font-size:9px">♻️</span><div style="flex:1;height:4px;background:rgba(0,0,0,.05);border-radius:2px;overflow:hidden"><div style="height:100%;width:${b.level}%;background:#3B82F6;border-radius:2px"></div></div><span style="font-family:var(--fm);font-size:10px;color:#3B82F6;font-weight:700">${b.level}%</span></div><div style="display:flex;align-items:center;gap:6px"><span style="font-size:9px">🌿</span><div style="flex:1;height:4px;background:rgba(0,0,0,.05);border-radius:2px;overflow:hidden"><div style="height:100%;width:${b.bioLevel||0}%;background:#10B981;border-radius:2px"></div></div><span style="font-family:var(--fm);font-size:10px;color:#10B981;font-weight:700">${b.bioLevel||0}%</span></div></div></td><td><span class="badge ${b.type==='Recyclable'?'bd-bl':b.type==='Hazardous'?'bd-go':'bd-sf'}">${esc(b.type)}</span></td><td><button class="btn btn-xs btn-dn" onclick="muniFlyo(${b.lat},${b.lng})">🚨 Dispatch</button></td></tr>`;}).join('')}</tbody></table></div></div></div>`;}

function renderScanPage(){const sc=S.scan;const wm=sc.result?(WASTE_META[sc.result.category]||WASTE_META.residual):null;return`<div style="max-width:820px;margin:0 auto"><div style="margin-bottom:22px"><h1 class="fu" style="font-family:var(--fd);font-size:32px;font-weight:700;letter-spacing:-.4px;margin-bottom:4px">AI Waste Scanner</h1><p class="fu1" style="color:var(--ink2);font-size:16px;line-height:1.6;margin-bottom:32px">Groq · Llama 4 Scout Vision · Verify at bin for +20% bonus</p></div>${sc.stage==='idle'?`<div class="fu"><div style="background:var(--s1);border:1px solid ${sc.keyStatus.state==='valid'?'rgba(16,185,129,.35)':sc.keyStatus.state==='invalid'?'rgba(239,68,68,.35)':'var(--border2)'};border-radius:16px;padding:18px;margin-bottom:16px"><div style="display:flex;align-items:center;gap:9px;margin-bottom:14px"><div style="width:36px;height:36px;border-radius:10px;background:var(--bl);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🔑</div><div><div style="font-weight:800;font-size:14px">Groq API Key</div><div style="font-size:10px;color:var(--ink3)">Free · No credit card · <a href="https://console.groq.com" target="_blank" style="color:#93C5FD">console.groq.com ↗</a></div></div>${sc.keyStatus.state==='valid'?`<span class="badge bd-gr" style="margin-left:auto">✓ Verified</span>`:''}</div><div style="display:flex;gap:8px;margin-bottom:11px"><input type="password" placeholder="gsk_… Paste your Groq key here" value="${esc(sc.apiKey)}" oninput="S.scan.apiKey=this.value;S.scan.keyStatus={state:'empty',msg:''};rerender()" style="flex:1;font-family:var(--fm);font-size:12px;padding:10px 13px"/><button class="btn ${sc.keyStatus.state==='valid'?'btn-gr':'btn-bl'}" style="padding:10px 16px;font-size:13px;flex-shrink:0" onclick="validateApiKey()" ${sc.keyStatus.state==='checking'?'disabled':''}>${sc.keyStatus.state==='valid'?'✓ Verified':'Verify Key'}</button></div>${sc.keyStatus.state==='valid'?`<div style="padding:10px 13px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.25);border-radius:9px;font-size:12px;color:var(--gr)">${esc(sc.keyStatus.msg)}</div>`:''}${sc.keyStatus.state==='invalid'?`<div style="padding:10px 13px;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.25);border-radius:9px;font-size:12px;color:var(--rd)">${esc(sc.keyStatus.msg)}</div>`:''}${!sc.apiKey?`<div style="font-size:10px;color:var(--ink3);padding:2px 0">Get a free key at <a href="https://console.groq.com" target="_blank" style="color:#93C5FD">console.groq.com</a></div>`:''}</div><div style="border:2px solid ${sc.keyStatus.state==='valid'?'rgba(234,88,12,.5)':'rgba(234,88,12,.15)'};border-radius:17px;padding:36px 26px;text-align:center;background:${sc.keyStatus.state==='valid'?'rgba(234,88,12,.04)':'rgba(0,0,0,.03)'};margin-bottom:13px;${sc.keyStatus.state!=='valid'?'opacity:.45;pointer-events:none':''}"><div style="font-size:54px;margin-bottom:10px">📷</div><p style="font-weight:700;font-size:15px;margin-bottom:4px">${sc.keyStatus.state==='valid'?'Upload or capture a waste image':'Verify your key above to unlock scanning'}</p><p style="color:var(--ink3);font-size:12px">${sc.keyStatus.state==='valid'?'AI classifies in ~3s · Verify at bin for +20% bonus':'Key verified → scanning unlocks automatically'}</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:13px;${sc.keyStatus.state!=='valid'?'opacity:.45;pointer-events:none':''}"><button class="btn btn-sf" style="justify-content:center;padding:13px" onclick="document.getElementById('scan-cam-input').click()">📷 Camera</button><button class="btn btn-gh" style="justify-content:center;padding:13px" onclick="document.getElementById('scan-file-input').click()">📁 Upload</button></div></div>`:''} ${sc.stage==='preview'&&sc.preview?`<div class="fu"><img src="${sc.preview}" style="width:100%;max-height:280px;object-fit:cover;border-radius:17px;border:2px solid rgba(234,88,12,.3);display:block;margin-bottom:13px"/><button class="btn btn-sf" style="width:100%;justify-content:center;padding:13px" onclick="analyzeScan()">🔍 Analyze with AI</button></div>`:''}${sc.stage==='result'&&sc.result&&wm?`<div class="fu"><div style="background:var(--s1);border-radius:17px;overflow:hidden;border:2px solid ${wm.color}25;margin-bottom:13px"><div style="background:${wm.color}0e;padding:18px;border-bottom:1px solid ${wm.color}20"><div style="display:flex;gap:11px;align-items:center"><div style="font-size:42px">${wm.icon}</div><div><div style="font-family:var(--fd);font-size:17px;font-weight:800;text-transform:capitalize">${esc(sc.result.item)}</div><span class="badge" style="background:${wm.color}18;color:${wm.color};border:1px solid ${wm.color}35;margin-top:5px">${wm.label}</span></div></div></div><div style="padding:16px">${sc.result.tip?`<div style="display:flex;gap:8px;background:rgba(234,88,12,.05);border:1px solid rgba(234,88,12,.13);border-radius:10px;padding:9px 11px;margin-bottom:14px"><span>💡</span><div style="font-size:14px;color:var(--ink2)">${esc(sc.result.tip)}</div></div>`:''}${sc.result.compartment?`<div style="display:flex;align-items:center;gap:10px;background:rgba(16,185,129,.07);border:1.5px solid rgba(16,185,129,.22);border-radius:12px;padding:12px 16px;margin-bottom:14px"><span style="font-size:22px">${sc.result.compartment.toLowerCase().includes('bio')?'🟢':'🔵'}</span><div><div style="font-weight:700;font-size:13px;color:#065F46">${esc(sc.result.compartment)}</div><div style="font-size:11px;color:var(--ink3)">Dispose here for maximum impact</div></div></div>`:''}<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px"><div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-family:var(--fm);font-size:10px;letter-spacing:.1em;color:var(--ink3)">♻️ RECYCLABILITY</span><span style="font-family:var(--fm);font-size:12px;font-weight:700;color:#3B82F6">${sc.result.recyclability_score||0}%</span></div><div style="height:6px;background:var(--s3);border-radius:3px;overflow:hidden"><div style="height:100%;width:${sc.result.recyclability_score||0}%;background:linear-gradient(90deg,#3B82F6,#60A5FA);border-radius:3px;transition:width 1s ease"></div></div></div><div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-family:var(--fm);font-size:10px;letter-spacing:.1em;color:var(--ink3)">🌿 BIODEGRADABILITY</span><span style="font-family:var(--fm);font-size:12px;font-weight:700;color:#10B981">${sc.result.biodegradability_score||0}%</span></div><div style="height:6px;background:var(--s3);border-radius:3px;overflow:hidden"><div style="height:100%;width:${sc.result.biodegradability_score||0}%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:3px;transition:width 1s ease"></div></div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px"><button class="btn btn-gr" style="justify-content:center;padding:11px" onclick="startVerify()">📍 Verify at Bin</button><button class="btn btn-gh" style="justify-content:center;padding:11px" onclick="instantClaim()">⚡ Instant Claim</button></div></div></div><button class="btn btn-gh btn-sm" style="width:100%;justify-content:center" onclick="resetScan()">← Scan Another</button></div>`:''}${sc.stage==='error'?`<div class="card-er fu"><p style="color:var(--rd);text-align:center;margin-bottom:14px">${esc(sc.err)}</p><button class="btn btn-gh" style="width:100%;justify-content:center" onclick="resetScan()">← Try Again</button></div>`:''}</div>`;}

function renderIoTPage(){const{iot}=S;const bins=iot.bins;let shown=iot.filt==='full'?bins.filter(b=>b.level>80):iot.filt==='ok'?bins.filter(b=>b.level<=55):iot.filt==='hotspot'?bins.filter(b=>isHotspot(b)):[...bins];if(iot.search)shown=shown.filter(b=>b.name.toLowerCase().includes(iot.search.toLowerCase())||b.area.toLowerCase().includes(iot.search.toLowerCase()));shown=shown.sort((a,b)=>b.level-a.level);return`<div><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap;gap:12px"><div><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.18em;margin-bottom:10px">LIVE TELEMETRY</div><h1 class="fu" style="font-family:var(--fd);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;letter-spacing:-2px;line-height:.95;margin-bottom:10px">IoT Bin<br/><em style="font-style:italic;color:var(--sf)">Intelligence.</em></h1><p class="fu1" style="color:var(--ink2);font-size:15px">${bins.length} sensors across Delhi · Live refresh every 3s</p></div><div class="badge bd-gr" style="padding:8px 16px;animation:pulse 3s infinite"><div style="width:7px;height:7px;border-radius:50%;background:var(--gr)"></div> Live</div></div><div class="g4" style="margin-bottom:36px">${[{v:bins.length,l:"Monitored",icon:"📡",c:"var(--sf)"},{v:bins.filter(b=>b.level>80).length,l:"Critical",icon:"🔴",c:"var(--rd)"},{v:bins.filter(b=>isHotspot(b)).length,l:"Hotspots",icon:"🔥",c:"var(--go)"},{v:Math.round(bins.reduce((s,b)=>s+b.recyclability,0)/bins.length),sx:"%",l:"Avg Recyclability",icon:"♻️",c:"var(--gr)"}].map(s=>`<div class="sc"><div style="font-size:26px;margin-bottom:14px">${s.icon}</div><div style="font-family:var(--fd);font-size:clamp(2rem,4vw,3rem);font-weight:400;letter-spacing:-2px;color:${s.c};line-height:1;margin-bottom:8px">${anHTML(s.v,s.sx||'')}</div><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.1em">${s.l.toUpperCase()}</div></div>`).join('')}</div><div style="background:var(--s1);border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:var(--shadow);margin-bottom:36px"><div style="padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px"><div><div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.14em;margin-bottom:4px">LIVE MAP</div><div style="font-family:var(--fd);font-size:18px;font-weight:600">All ${bins.length} Bins — Delhi NCT</div></div><div style="display:flex;gap:7px;flex-wrap:wrap">${[['all','All'],['full','Critical'],['hotspot','Hotspots'],['ok','Normal']].map(([v,l])=>`<button class="btn btn-xs ${iot.filt===v?'btn-sf':'btn-gh'}" onclick="setIotFilter('${v}')">${l}</button>`).join('')}</div></div><div style="position:relative">${mapLegendHTML()}<div id="map-iot" style="height:520px"></div></div></div><div style="margin-bottom:20px;display:flex;gap:12px;flex-wrap:wrap;align-items:center"><input id="iot-search" placeholder="Search by name or area…" oninput="iotSearch(this.value)" value="${iot.search||''}" style="max-width:320px;padding:10px 14px;font-size:13px"/><div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.1em">SHOWING ${shown.length} OF ${bins.length}</div></div><div style="background:var(--s1);border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:var(--shadow)"><table><thead><tr><th>#</th><th>Bin Name</th><th>Area</th><th>Type</th><th>♻️ Recycle Fill</th><th>🌿 Bio Fill</th><th>Recyclability</th><th>Biodegradability</th><th>Disposals</th><th>Hotspot</th><th>QR</th></tr></thead><tbody>${shown.map((b,i)=>{const col=binColor(b.level);const recCol=b.recyclability>65?'var(--gr)':b.recyclability>40?'var(--go)':'var(--rd)';const actCol=b.disposals60d>60?'var(--gr)':b.disposals60d>30?'var(--go)':'var(--rd)';const hs=isHotspot(b);const score=hotspotScore(b);return`<tr data-bin-row data-bin-name="${esc(b.name)}" data-bin-area="${esc(b.area)}" style="${hs?'background:rgba(185,28,28,.018)':''}"><td style="font-family:var(--fm);font-size:11px;color:var(--ink3)">${i+1}</td><td><div style="font-weight:600;font-size:14px">${esc(b.name)}</div>${hs?`<div style="font-size:10px;color:var(--rd);font-family:var(--fm)">🔥 Campaign Needed</div>`:''}</td><td><span class="badge bd-sf" style="font-size:9px">${esc(b.area)}</span></td><td><span class="badge bd-bl" style="font-size:9px">${esc(b.type)}</span></td><td><div style="display:flex;align-items:center;gap:6px;min-width:100px"><div style="flex:1;height:5px;background:var(--s3);border-radius:3px"><div style="height:100%;width:${b.level}%;background:linear-gradient(90deg,#3B82F6,#60A5FA);border-radius:3px"></div></div><span style="font-family:var(--fm);font-size:11px;color:#3B82F6;font-weight:700;min-width:28px">${b.level}%</span></div></td><td><div style="display:flex;align-items:center;gap:6px;min-width:100px"><div style="flex:1;height:5px;background:var(--s3);border-radius:3px"><div style="height:100%;width:${b.bioLevel||0}%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:3px"></div></div><span style="font-family:var(--fm);font-size:11px;color:#10B981;font-weight:700;min-width:28px">${b.bioLevel||0}%</span></div></td><td><span style="font-family:var(--fm);font-size:13px;color:${recCol};font-weight:700">${b.recyclability}%</span></td><td><span style="font-family:var(--fm);font-size:13px;color:${b.biodegradability>65?'var(--gr)':b.biodegradability>40?'var(--go)':'var(--rd)'};font-weight:700">${b.biodegradability||0}%</span></td><td><span style="font-family:var(--fm);font-size:13px;color:${actCol};font-weight:700">${b.disposals60d}</span></td><td>${hs?`<span class="badge bd-rd" style="font-size:9px">Score ${score}</span>`:`<span style="color:var(--ink3);font-size:12px">—</span>`}</td><td><button class="btn btn-gh btn-xs" onclick="openIotQR(${b.id})">📷 QR</button></td></tr>`;}).join('')}</tbody></table></div>${iot.qrBin?`<div class="qov" onclick="closeIotQR()"><div class="qm" onclick="event.stopPropagation()" style="max-width:460px;padding:0;overflow:hidden">${iot.presenceStatus==='done'?`<div style="padding:40px 36px;text-align:center"><div style="width:72px;height:72px;background:rgba(6,95,70,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;border:2px solid rgba(6,95,70,.2)"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7 13-14" stroke="#065F46" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:44;stroke-dashoffset:44;animation:drawCheck .5s .1s ease forwards"/></svg></div><div style="font-family:var(--fm);font-size:10px;color:var(--gr);letter-spacing:.18em;margin-bottom:10px">PRESENCE CONFIRMED</div><div style="font-family:var(--fd);font-size:52px;font-weight:400;color:var(--sf);letter-spacing:-2px;line-height:1;margin-bottom:6px">+50</div><div style="font-family:var(--fd);font-size:20px;color:var(--ink2);margin-bottom:20px;font-style:italic">WasteCoins earned</div><button class="btn btn-sf" style="width:100%;justify-content:center" onclick="S.iot.qrBin=null;S.iot.presenceStatus='idle';navigate('dashboard')">Go to Dashboard →</button></div>`:`<div style="padding:24px 28px 20px;border-bottom:1px solid var(--border)"><h3 style="font-family:var(--fd);font-size:24px;font-weight:400;letter-spacing:-.8px;margin-bottom:5px">${esc(iot.qrBin.name)}</h3><div style="font-size:13px;color:var(--ink2);margin-bottom:12px">${esc(iot.qrBin.area)} · ${esc(iot.qrBin.ward)}</div><div style="display:flex;gap:7px"><span class="badge ${iot.qrBin.type==='Recyclable'?'bd-bl':'bd-gr'}">${esc(iot.qrBin.type)}</span><span class="badge" style="background:${binColor(iot.qrBin.level)+'18'};color:${binColor(iot.qrBin.level)}">${iot.qrBin.level}% Full</span></div></div><div style="padding:14px 28px;border-bottom:1px solid var(--border)"><div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:11px;font-weight:600;color:#3B82F6;font-family:var(--fm)">♻️ RECYCLABLE COMPARTMENT</span><span style="font-size:11px;font-weight:700;color:${binColor(iot.qrBin.level)};font-family:var(--fm)">${iot.qrBin.level}%</span></div><div style="height:7px;background:var(--s3);border-radius:4px;overflow:hidden"><div style="height:100%;width:${iot.qrBin.level}%;background:linear-gradient(90deg,#3B82F6,#60A5FA);border-radius:4px"></div></div></div><div><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:11px;font-weight:600;color:#10B981;font-family:var(--fm)">🌿 BIODEGRADABLE COMPARTMENT</span><span style="font-size:11px;font-weight:700;color:${binBioColor(iot.qrBin.bioLevel||0)};font-family:var(--fm)">${iot.qrBin.bioLevel||0}%</span></div><div style="height:7px;background:var(--s3);border-radius:4px;overflow:hidden"><div style="height:100%;width:${iot.qrBin.bioLevel||0}%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:4px"></div></div></div></div><div style="padding:20px 28px"><div style="background:rgba(6,95,70,.06);border:1px solid rgba(6,95,70,.18);border-radius:14px;padding:18px 20px;margin-bottom:20px;display:flex;align-items:center;gap:14px"><div style="font-size:28px">⭐</div><div><div style="font-family:var(--fm);font-size:9px;color:var(--gr);letter-spacing:.14em;margin-bottom:4px">YOU WILL EARN</div><div style="font-family:var(--fd);font-size:26px;font-weight:700;color:var(--gr)">+50 WasteCoins</div></div></div><button class="btn btn-sf btn-lg" onclick="confirmPresence()" style="width:100%;justify-content:center">✓ Confirm Presence at Bin</button><button class="btn btn-gh" style="width:100%;justify-content:center;margin-top:8px" onclick="closeIotQR()">Close</button></div>`}</div></div>`:''}  </div>`;}

function renderAdminDashboard(){const tab=S.admin.tab||'users';const users=loadUsers();const tabs=[{id:'users',l:'👥 Users'},{id:'presence',l:'📍 Presence Log'},{id:'hotspots',l:'🔥 Hotspots'},{id:'bins',l:'🗑️ Bins'},{id:'jsonbin',l:'☁️ Cloud Sync'}];const hotspotBins=DELHI_BINS.filter(isHotspot).sort((a,b)=>hotspotScore(b)-hotspotScore(a));return`<div><div style="margin-bottom:36px"><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.18em;margin-bottom:12px">ADMIN PANEL</div><h1 style="font-family:var(--fd);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;letter-spacing:-2px;line-height:.95;margin-bottom:12px">System<br/><em style="font-style:italic;color:var(--sf)">Intelligence.</em></h1></div><div style="display:flex;gap:4px;border-bottom:2px solid var(--border);margin-bottom:32px;overflow-x:auto">${tabs.map(t=>`<button onclick="S.admin.tab='${t.id}';rerender()" style="padding:10px 20px;border:none;background:none;cursor:pointer;font-family:var(--fb);font-size:13px;font-weight:600;color:${tab===t.id?'var(--sf)':'var(--ink2)'};border-bottom:${tab===t.id?'2px solid var(--sf)':'2px solid transparent'};margin-bottom:-2px;white-space:nowrap">${t.l}</button>`).join('')}</div>${tab==='users'?`<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden">${users.length===0?`<div style="padding:48px;text-align:center;color:var(--ink3)">No users yet — sign up via the platform to see them here.</div>`:`<table><thead><tr><th>#</th><th>Name</th><th>Phone/Email</th><th>Role</th><th>WasteCoins</th><th>Sec Q</th><th>Joined</th><th>Action</th></tr></thead><tbody>${users.map((u,i)=>`<tr><td style="font-family:var(--fm);font-size:11px;color:var(--ink3)">${i+1}</td><td style="font-weight:600">${esc(u.name)}</td><td style="font-size:13px;color:var(--ink2)">${esc(u.contact||'—')}</td><td><span class="badge ${u.role==='municipality'?'bd-pu':u.role==='collector'?'bd-bl':u.role==='admin'?'bd-rd':'bd-sf'}">${u.role}</span></td><td style="font-family:var(--fm);font-weight:700;color:var(--sf)">${(u.pts||0).toLocaleString('en-IN')}</td><td style="font-size:12px;color:var(--ink3)">${new Date(u.joinedAt||Date.now()).toLocaleDateString('en-IN')}</td><td style="font-size:11px;color:var(--ink3)">${esc(u.securityQuestion||'—')}</td><td>${S.currentUser?.id===u.id?`<span style="font-size:11px;color:var(--ink3)">• you</span>`:`<button class="btn btn-dn btn-xs" onclick="deleteUser('${u.id}')">🗑 Remove</button>`}</td></tr>`).join('')}</tbody></table>`}</div>`:''}${tab==='presence'?`<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden">${S.presenceLog.length===0?`<div style="padding:48px;text-align:center;color:var(--ink3)">No check-ins yet.</div>`:`<table><thead><tr><th>User</th><th>Bin</th><th>Area</th><th>Fill</th><th>Points</th><th>Time</th></tr></thead><tbody>${S.presenceLog.map(l=>`<tr><td style="font-weight:600">${esc(l.user)}</td><td>${esc(l.binName)}</td><td>${esc(l.area)}</td><td style="font-family:var(--fm);font-weight:700;color:${binColor(l.level)}">${l.level}%</td><td style="font-family:var(--fd);font-size:16px;font-weight:700;color:var(--gr)">+${l.pts}</td><td style="font-family:var(--fm);font-size:11px">${new Date(l.ts).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</td></tr>`).join('')}</tbody></table>`}</div>`:''}${tab==='hotspots'?`<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden">${hotspotBins.length===0?`<div style="padding:40px;text-align:center;color:var(--ink3)">No hotspots.</div>`:`<table><thead><tr><th>Bin</th><th>Area</th><th>Score</th><th>Disposals/60d</th><th>Recyclability</th><th>Fill</th></tr></thead><tbody>${hotspotBins.map(b=>{const sc=hotspotScore(b);return`<tr><td style="font-weight:600">${esc(b.name)}</td><td>${esc(b.area)}</td><td style="font-family:var(--fm);font-weight:700;color:${sc>80?'var(--rd)':'var(--go)'}">${sc}/100</td><td style="font-family:var(--fm);color:${(b.disposals60d||0)<30?'var(--rd)':'var(--gr)'}">${b.disposals60d||0}</td><td style="font-family:var(--fm);color:${(b.recyclability||50)<40?'var(--rd)':'var(--gr)'}">${b.recyclability||50}%</td><td style="font-family:var(--fm);color:${binColor(b.level)}">${b.level}%</td></tr>`;}).join('')}</tbody></table>`}</div>`:''}${tab==='bins'?`<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden"><table><thead><tr><th>ID</th><th>Name</th><th>Area</th><th>Ward</th><th>♻️ Fill</th><th>🌿 Bio Fill</th><th>Hotspot?</th></tr></thead><tbody>${DELHI_BINS.map(b=>`<tr><td style="font-family:var(--fm);font-size:10px;color:var(--ink3)">${b.id}</td><td style="font-weight:600;font-size:13px">${esc(b.name)}</td><td>${esc(b.area)}</td><td style="font-size:12px;color:var(--ink2)">${esc(b.ward)}</td><td style="font-family:var(--fm);font-weight:700;color:#3B82F6">${b.level}%</td><td style="font-family:var(--fm);font-weight:700;color:#10B981">${b.bioLevel||0}%</td><td>${isHotspot(b)?`<span class="badge bd-rd">🔥 Yes</span>`:`<span style="color:var(--ink3)">—</span>`}</td></tr>`).join('')}</tbody></table></div>`:''}${tab==='jsonbin'?`<div style="max-width:720px"><div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px"><div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.14em;margin-bottom:16px">CLOUD SYNC CREDENTIALS</div><div style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px"><div style="background:var(--s2);border-radius:10px;padding:12px 16px;font-family:var(--fm);font-size:11px;color:var(--ink2)">Bin ID: <strong style="color:var(--sf)">69c108beb7ec241ddc945b90</strong></div><input id="jb-key" type="password" placeholder="$2a$10$..." value="${JSONBIN_KEY}"/></div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-sf" onclick="saveJsonBinConfig()">Save & Test Connection</button><button class="btn btn-gh" onclick="forceSyncToCloud()">☁️ Force Sync Now</button></div><div id="jb-status" style="margin-top:14px;font-size:13px;color:var(--ink3)"></div></div></div>`:''}  </div>`;}

function renderRewardsPage(){const{cPts,pPts}=S;return`<div><h1 class="fu" style="font-family:var(--fd);font-size:32px;font-weight:700;letter-spacing:-.4px;margin-bottom:4px">Rewards & Perks</h1><p class="fu1" style="color:var(--ink2);font-size:13px;margin-bottom:20px">Redeem WasteCoins for Delhi government benefits</p><div style="background:linear-gradient(135deg,#0A1628,#0A1F2A);border-radius:20px;padding:22px;margin-bottom:20px;border:1px solid rgba(59,130,246,.2)"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:13px"><div><div style="font-size:10px;color:#93C5FD;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px">Confirmed Balance</div><div style="font-family:var(--fm);font-size:40px;font-weight:900;line-height:1;color:#fff">${anHTML(cPts)}</div><div style="font-size:12px;color:#93C5FD;margin-top:4px">WasteCoins available</div></div></div></div><div class="g3" style="margin-bottom:26px">${PERKS.map(p=>{const can=cPts>=p.pts;return`<div class="card" style="opacity:${can?1:.55}"><div style="font-size:32px;margin-bottom:10px">${p.icon}</div><h3 style="font-weight:700;font-size:13px;margin-bottom:4px">${esc(p.title)}</h3><p style="font-size:14px;color:var(--ink2);margin-bottom:12px">${esc(p.desc)}</p><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-family:var(--fm);font-weight:700;color:${can?'var(--sfh)':'var(--ink3)'};font-size:11px">⭐ ${p.pts.toLocaleString('en-IN')}</div><button onclick="redeemPerk(${p.id})" style="background:${can?'var(--sf)':'var(--s2)'};color:${can?'#fff':'var(--ink3)'};border:none;padding:5px 13px;border-radius:8px;cursor:${can?'pointer':'not-allowed'};font-family:var(--fb);font-weight:700;font-size:12px">${can?'Redeem':'Need more'}</button></div></div>`;}).join('')}</div></div>`;}

function renderSettingsPage(){const{role,userArea,settings:st}=S;const tog=(k)=>`<div class="toggle-wrap" style="background:${st.notifs[k]?'var(--gr)':'var(--s3)'}" onclick="toggleNotif('${k}')"><div class="toggle-knob" style="left:${st.notifs[k]?22:3}px"></div></div>`;return`<div style="max-width:860px"><h1 class="fu" style="font-family:var(--fd);font-size:32px;font-weight:700;letter-spacing:-.4px;margin-bottom:20px">Settings & Profile</h1><div class="card" style="margin-bottom:24px"><div style="display:flex;align-items:center;gap:14px;margin-bottom:18px"><div style="width:60px;height:60px;border-radius:15px;background:linear-gradient(135deg,var(--sf),var(--bl));display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;font-family:var(--fd);color:#fff">${(S.currentUser?.name||'U')[0].toUpperCase()}</div><div><div style="font-weight:800;font-size:16px">${esc(S.currentUser?.name||'User')}</div><div style="color:var(--ink3);font-size:12px">${esc(S.currentUser?.contact||'—')}</div><div style="display:flex;gap:7px;margin-top:6px"><span class="badge ${role==='municipality'?'bd-pu':role==='collector'?'bd-bl':'bd-sf'}">${role}</span>${userArea?`<span class="badge bd-gr">📍 ${esc(userArea.name)}</span>`:''}</div></div></div><button class="btn btn-gh btn-sm" onclick="openLocModal()">📍 Update Location</button></div><div class="card" style="margin-bottom:24px"><h3 style="font-family:var(--fd);font-size:12px;font-weight:700;margin-bottom:11px">🔔 Notifications</h3>${[['scan','Daily scan reminders'],['pickup','Bin pickup alerts'],['verify','Verification expiry'],['rewards','Points & rewards'],['alerts','Emergency alerts']].map(([k,l])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:13px;color:var(--ink2)">${l}</span>${tog(k)}</div>`).join('')}</div><button onclick="logout()" style="width:100%;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);color:var(--rd);padding:12px;border-radius:12px;cursor:pointer;font-family:var(--fb);font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px">🚪 Sign Out</button></div>`;}

function renderRoutePlanner(){const{route:rs,collectorRoute:routeR,collectorBioRoute:routeB}=S;if(rs.showSPick)return renderStartPicker();const tab=rs.routeTab||'recycle';const isRecycle=tab==='recycle';const route=isRecycle?routeR:routeB;let shown=[...DELHI_BINS].sort((a,b)=>isRecycle?(b.level-a.level):((b.bioLevel||0)-(a.bioLevel||0)));if(rs.filter==='crit')shown=shown.filter(x=>isRecycle?x.level>80:(x.bioLevel||0)>80);if(rs.filter==='med')shown=shown.filter(x=>isRecycle?(x.level>50&&x.level<=80):((x.bioLevel||0)>50&&(x.bioLevel||0)<=80));const critCountR=DELHI_BINS.filter(b=>b.level>80).length;const critCountB=DELHI_BINS.filter(b=>(b.bioLevel||0)>80).length;const critCount=isRecycle?critCountR:critCountB;const dist=route.length>1?routeDist(route).toFixed(1):0;return`<div><div style="display:flex;align-items:center;gap:14px;margin-bottom:28px;flex-wrap:wrap"><button class="btn btn-gh btn-sm" onclick="navigate('dashboard')">← Back</button><div style="flex:1"><h1 style="font-family:var(--fd);font-size:28px;font-weight:700;letter-spacing:-.5px;margin-bottom:4px">${isRecycle?'♻️ Recyclable':'🌿 Biodegradable'} Route Planner</h1><p style="font-size:13px;color:var(--ink3)">Start: <strong style="color:var(--gr)">${esc(rs.startPoint?rs.startPoint.name:'Not set')}</strong> · <strong style="color:${isRecycle?'#3B82F6':'#10B981'}">${isRecycle?'Blue Truck DL-01-BL':'Green Truck DL-02-GR'}</strong></p></div><button class="btn btn-gh btn-sm" onclick="showStartPicker()">📍 Change Start</button></div><div style="display:flex;gap:2px;background:var(--s2);padding:4px;border-radius:12px;margin-bottom:24px;width:fit-content"><button onclick="S.route.routeTab='recycle';rerender()" style="padding:9px 22px;border:none;border-radius:9px;font-family:var(--fb);font-weight:600;font-size:13px;cursor:pointer;transition:all .15s;background:${isRecycle?'white':'transparent'};color:${isRecycle?'#3B82F6':'var(--ink3)'};box-shadow:${isRecycle?'var(--shadow)':'none'}">♻️ Recyclable Fleet</button><button onclick="S.route.routeTab='bio';rerender()" style="padding:9px 22px;border:none;border-radius:9px;font-family:var(--fb);font-weight:600;font-size:13px;cursor:pointer;transition:all .15s;background:${!isRecycle?'white':'transparent'};color:${!isRecycle?'#10B981':'var(--ink3)'};box-shadow:${!isRecycle?'var(--shadow)':'none'}">🌿 Biodegradable Fleet</button></div><div style="display:grid;grid-template-columns:280px 1fr;gap:18px;margin-bottom:18px"><div style="display:flex;flex-direction:column;gap:10px"><div class="card" style="padding:14px;border-color:${isRecycle?'rgba(59,130,246,.25)':'rgba(16,185,129,.25)'}"><div style="font-size:10px;font-weight:700;color:${isRecycle?'#3B82F6':'#10B981'};text-transform:uppercase;letter-spacing:1px;margin-bottom:9px">${isRecycle?'Recycle Bin':'Bio Bin'} Filter</div><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:9px">${[['all','All'],['crit','🔴 Critical'],['med','🟡 Medium']].map(([v,l])=>`<button class="btn btn-sm ${rs.filter===v?(isRecycle?'btn-bl':'btn-gr'):'btn-gh'}" style="padding:5px 10px;font-size:11px" onclick="setRouteFilter('${v}')">${l}</button>`).join('')}</div><button class="btn btn-sm" style="width:100%;justify-content:center;font-size:11px;background:${isRecycle?'rgba(59,130,246,.08)':'rgba(16,185,129,.08)'};color:${isRecycle?'#3B82F6':'#10B981'};border:1px solid ${isRecycle?'rgba(59,130,246,.22)':'rgba(16,185,129,.22)'}" onclick="${isRecycle?'addAllRecycleCritical':'addAllBioCritical'}()">${isRecycle?'♻️':'🌿'} Add All ${critCount} Critical</button></div><div style="overflow-y:auto;max-height:330px;display:flex;flex-direction:column;gap:5px">${shown.slice(0,30).map(bin=>{const fillVal=isRecycle?bin.level:(bin.bioLevel||0);const col=isRecycle?'#3B82F6':'#10B981';const inR=!!route.find(r=>r.id===bin.id);const ridx=route.findIndex(r=>r.id===bin.id);return`<div class="rbi${inR?' inr':''}${fillVal>80?' crit':''}" onclick="${inR?(isRecycle?`removeRouteBin(${bin.id})`:`removeBioRouteBin(${bin.id})`):(isRecycle?`addRouteBin(${bin.id})`:`addBioRouteBin(${bin.id})`)}"><div style="width:9px;height:9px;border-radius:50%;background:${col};flex-shrink:0"></div><div style="flex:1;min-width:0"><div style="font-weight:600;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(bin.name)}</div><div style="font-size:10px;color:var(--ink3)">${esc(bin.area)} · <span style="color:${col};font-weight:700">${fillVal}%</span></div></div>${inR?`<div style="width:20px;height:20px;border-radius:50%;background:${col};color:white;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-weight:800;font-size:10px">${ridx+1}</div>`:`<span style="color:var(--ink3);font-size:15px">+</span>`}</div>`;}).join('')}</div></div><div style="position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--border2)">${mapLegendHTML(rs.startPoint)}<div id="map-route" style="height:390px"></div></div></div><div style="background:${route.length>0?`linear-gradient(135deg,${isRecycle?'rgba(29,78,216,.14)':'rgba(5,150,105,.14)'},${isRecycle?'rgba(59,130,246,.07)':'rgba(16,185,129,.07)'})`:'var(--s1)'};border:1px solid ${route.length>0?(isRecycle?'rgba(59,130,246,.32)':'rgba(16,185,129,.32)'):'var(--border)'};border-radius:16px;padding:16px 20px;display:flex;align-items:center;gap:22px;flex-wrap:wrap"><div style="flex:1"><div id="route-summary" style="font-family:var(--fd);font-size:15px;font-weight:800;margin-bottom:3px">${route.length===0?'No bins selected':`${isRecycle?'♻️':'🌿'} Route: ${route.length} stop${route.length>1?'s':''} · ${dist} km`}</div></div><div style="display:flex;gap:9px;flex-wrap:wrap">${route.length>1?`<button class="btn btn-gh btn-sm" onclick="${isRecycle?'optimizeRoute':'optimizeBioRoute'}()">⚡ Optimize</button>`:''}${route.length>0?`<button class="btn btn-dn btn-sm" onclick="${isRecycle?'clearRoute':'clearBioRoute'}()">✕ Clear</button>`:''}${!(isRecycle?rs.started:rs.bioStarted)&&route.length>0?`<button class="btn" style="background:${isRecycle?'#3B82F6':'#10B981'};color:#fff;border-color:${isRecycle?'#3B82F6':'#10B981'}" onclick="${isRecycle?'startRoute':'startBioRoute'}()">${isRecycle?'♻️':'🌿'} Start Route</button>`:''}${(isRecycle?rs.started:rs.bioStarted)?`<div style="display:flex;align-items:center;gap:7px;padding:8px 14px;background:${isRecycle?'rgba(59,130,246,.12)':'rgba(16,185,129,.12)'};border:1px solid ${isRecycle?'rgba(59,130,246,.3)':'rgba(16,185,129,.3)'};border-radius:10px"><div style="width:7px;height:7px;border-radius:50%;background:${isRecycle?'#3B82F6':'#10B981'};animation:pulse 1.5s infinite"></div><span style="font-weight:700;font-size:13px;color:${isRecycle?'#3B82F6':'#10B981'}">Route Active</span></div>`:''}</div></div></div>`;}

function renderStartPicker(){return`<div><div style="display:flex;align-items:center;gap:14px;margin-bottom:28px"><button class="btn btn-gh btn-sm" onclick="navigate('dashboard')">← Back</button><h1 style="font-family:var(--fd);font-size:20px;font-weight:800">Where are you starting from?</h1></div><div class="card" style="max-width:520px;margin:0 auto;padding:28px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">${DELHI_AREAS.map(area=>`<div onclick="setRouteStart('${area.id}')" style="padding:12px 14px;border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all .18s;background:var(--s1)" onmouseenter="this.style.borderColor='var(--bl)'" onmouseleave="this.style.borderColor='var(--border)'"><div style="font-weight:700;font-size:12px;margin-bottom:2px">${esc(area.name)}</div><div style="font-size:10px;color:var(--ink3)">${esc(area.ward)}</div></div>`).join('')}</div><button class="btn btn-gr btn-sm" style="width:100%;justify-content:center" onclick="useGPSStart()">📍 Use GPS Location</button></div></div>`;}

function renderVerifyFlow(){const{verify:vf,actSess}=S;if(!actSess)return`<div style="text-align:center;padding:48px"><button class="btn btn-gh btn-sm" onclick="navigate('dashboard')">← Back</button></div>`;const wm=WASTE_META[actSess.wasteResult?.category]||WASTE_META.residual;const bin=actSess.assignedBin;const step=vf.step;const steps=['Scan','Travel','Throw','Verify'];return`<div style="max-width:820px;margin:0 auto"><h1 style="font-family:var(--fd);font-size:20px;font-weight:800;margin-bottom:4px">Verification Flow</h1><div class="vst">${steps.map((l,i)=>{const s=i<step?'done':i===step-1?'act':'idle';return`<div class="vstep ${s}"><div class="vc ${s}">${i<step-1?'✓':(i+1)}</div><div class="vl">${l}</div></div>`;}).join('')}</div><div class="card" style="margin-bottom:14px;display:flex;gap:12px;align-items:center"><div style="font-size:36px">${wm.icon}</div><div style="flex:1"><div style="font-weight:800;font-size:14px;text-transform:capitalize">${esc(actSess.wasteResult?.item||'Waste Item')}</div></div><div style="font-family:var(--fm);font-weight:900;font-size:22px;color:var(--sf)">+${actSess.pendingPoints}</div></div>${step===1?`<div class="card" style="margin-bottom:11px"><h3 style="font-family:var(--fd);font-size:22px;font-weight:700;margin-bottom:5px">📍 Travel to Bin</h3><div style="background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.2);border-radius:12px;padding:14px;margin-bottom:16px"><div style="font-weight:800;font-size:14px">${esc(bin.name)}</div><div style="font-size:14px;color:var(--ink2)">${esc(bin.area)}</div></div><button class="btn btn-sf btn-lg" style="width:100%;justify-content:center" onclick="verifyStep(2)">🚶 I'm at the bin! →</button></div>`:''}${step===2?`<div class="card" style="margin-bottom:11px"><h3 style="font-family:var(--fd);font-size:22px;font-weight:700;margin-bottom:5px">📱 Scan Bin QR</h3><button class="btn btn-sf btn-lg" style="width:100%;justify-content:center" onclick="verifyStep(3)">✅ QR Scanned! →</button></div>`:''}${step===3?`<div class="card" style="margin-bottom:11px"><h3 style="font-family:var(--fd);font-size:22px;font-weight:700;margin-bottom:5px">📸 Photo Proof</h3>${!vf.proof?`<button class="btn btn-gh btn-sm" style="width:100%;justify-content:center" onclick="simulateProof()">🤖 Simulate Bin Camera</button>`:`<button class="btn btn-sf" style="width:100%;justify-content:center" onclick="submitProof()">🚀 Submit & Claim Points</button>`}</div>`:''}${step===4?`<div style="text-align:center"><div class="card-ok" style="padding:34px"><div style="font-size:52px;margin-bottom:16px">✅</div><h2 style="font-family:var(--fd);font-size:22px;font-weight:900;color:var(--gr)">Verified! 🎉</h2><button class="btn btn-gr btn-lg" style="width:100%;justify-content:center;margin-top:18px" onclick="navigate('dashboard')">🏠 Dashboard</button></div></div>`:''}  </div>`;}


const PROTO_BIN_URL='https://api.jsonbin.io/v3/b/69c5564baa77b81da92155c8/latest';
let _protoTimer=null;
async function fetchProtoData(){if(S.page!=='prototype')return;S.proto.loading=true;try{const r=await fetch(PROTO_BIN_URL,{headers:{'X-Master-Key':JSONBIN_KEY}});if(!r.ok)throw new Error('HTTP '+r.status);const d=await r.json();S.proto.data=d.record||d;S.proto.lastFetch=new Date().toISOString();S.proto.err=null;}catch(e){S.proto.err=e.message;}S.proto.loading=false;rerender();if(S.page==='prototype'){clearTimeout(_protoTimer);_protoTimer=setTimeout(fetchProtoData,8000);}}
let iotInterval=null,verifyInterval=null;

function renderPrototypePage(){
  const pd=S.proto.data;
  const bin=pd?pd.bin:null;
  const overall=pd?pd.overall:null;
  const loading=S.proto.loading;
  const err=S.proto.err;

  const fill=bin?Math.round(bin.level||0):null;
  const dist=bin?bin.distanceCm:null;
  const wt=bin?bin.weightGrams:null;
  const status=bin?bin.status:'—';
  const label=bin?bin.waste_label:'—';
  const rScore=bin?bin.recyclability_score:null;
  const bScore=bin?bin.biodegradability_score:null;
  const notes=bin?bin.classification_notes:'';
  const ts=bin?bin.timestamp:null;
  const fillCol=fill>=90?'#EF4444':fill>=70?'#F59E0B':fill>=40?'#3B82F6':'#10B981';
  const statusColors={'FULL':'#EF4444','HIGH':'#F59E0B','MEDIUM':'#3B82F6','LOW':'#10B981'};
  const sCol=statusColors[status]||'var(--ink3)';

  return`<div>
    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:36px;flex-wrap:wrap;gap:16px">
      <div>
        <div style="font-family:var(--fm);font-size:10px;color:var(--sf);letter-spacing:.18em;margin-bottom:12px;font-weight:500">PROTOTYPE · LIVE DATA</div>
        <h1 class="fu" style="font-family:var(--fd);font-size:clamp(2.5rem,6vw,5.5rem);font-weight:300;letter-spacing:-3px;line-height:.92;margin-bottom:10px">
          Bharat<br/><em style="font-style:italic;color:var(--sf)">Mandapam.</em>
        </h1>
        <p style="font-size:14px;color:var(--ink2)">📡 Raspberry Pi sensor · Live refresh every 8s</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        ${loading?`<div class="badge bd-sf" style="animation:pulse 1s infinite">⟳ Fetching…</div>`:
          err?`<div class="badge bd-rd">⚠ ${esc(err)}</div>`:
          `<div class="badge bd-gr" style="animation:pulse 3s infinite"><div style="width:6px;height:6px;border-radius:50%;background:var(--gr)"></div> Live</div>`}
        <button class="btn btn-gh btn-sm" onclick="fetchProtoData()">↻ Refresh</button>
      </div>
    </div>

    ${err&&!bin?`<div class="card-er" style="margin-bottom:24px;text-align:center">
      <p style="color:var(--rd);margin-bottom:8px">⚠ Cannot reach prototype bin</p>
      <p style="font-size:13px;color:var(--ink3)">${esc(err)}</p>
    </div>`:''}

    <!-- Map + Fill side by side -->
    <div class="g2" style="margin-bottom:28px;align-items:start">

      <!-- Map card -->
      <div style="background:var(--s1);border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:var(--shadow)">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.14em">LIVE LOCATION</div>
            <div style="font-family:var(--fd);font-size:16px;font-weight:600">Bharat Mandapam, New Delhi</div>
          </div>
          <span class="badge bd-sf">28.6212° N, 77.2106° E</span>
        </div>
        <div style="position:relative">
          <div id="map-proto" style="height:380px"></div>
        </div>
      </div>

      <!-- Bin status panel -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <!-- Big fill gauge -->
        <div style="background:var(--s1);border:2px solid ${fill!==null?(fill>=90?'rgba(239,68,68,.3)':fill>=70?'rgba(245,158,11,.3)':'rgba(59,130,246,.2)'):'var(--border)'};border-radius:20px;padding:28px;text-align:center;box-shadow:var(--shadow)">
          <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.2em;margin-bottom:16px">BIN FILL LEVEL</div>

          <!-- Circular gauge -->
          ${fill!==null?cpSVG(fill,110,11,fillCol,`
            <div style="font-family:var(--fd);font-size:2.2rem;font-weight:700;color:${fillCol};line-height:1">${fill}%</div>
            <div style="font-family:var(--fm);font-size:10px;color:${sCol};font-weight:700;margin-top:4px">${status}</div>
          `):`<div style="font-size:48px;opacity:.3">📡</div>`}

          <div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:left">
            <div style="background:var(--s2);border-radius:10px;padding:12px">
              <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.12em">DISTANCE</div>
              <div style="font-family:var(--fd);font-size:22px;font-weight:700;color:var(--ink)">${dist!==null?dist+'cm':'—'}</div>
            </div>
            <div style="background:var(--s2);border-radius:10px;padding:12px">
              <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.12em">WEIGHT</div>
              <div style="font-family:var(--fd);font-size:22px;font-weight:700;color:var(--ink)">${wt!==null?Math.round(wt)+'g':'—'}</div>
            </div>
          </div>
        </div>

        <!-- Last item classified -->
        <div style="background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:22px;box-shadow:var(--shadow)">
          <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.2em;margin-bottom:14px">LAST ITEM DETECTED</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(200,75,10,.08);border:1px solid rgba(200,75,10,.18);display:flex;align-items:center;justify-content:center;font-size:22px">🗑️</div>
            <div>
              <div style="font-family:var(--fd);font-size:18px;font-weight:700;text-transform:capitalize">${esc(label)}</div>
              ${notes?`<div style="font-size:12px;color:var(--ink3);margin-top:2px">${esc(notes)}</div>`:''}
            </div>
          </div>
          <!-- Recyclability bar -->
          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-family:var(--fm);font-size:10px;color:var(--ink3)">♻️ RECYCLABILITY</span>
              <span style="font-family:var(--fm);font-size:11px;font-weight:700;color:#3B82F6">${rScore!==null?rScore+'%':'—'}</span>
            </div>
            <div style="height:7px;background:var(--s3);border-radius:4px;overflow:hidden">
              <div style="height:100%;width:${rScore||0}%;background:linear-gradient(90deg,#3B82F6,#60A5FA);border-radius:4px;transition:width 1.2s ease"></div>
            </div>
          </div>
          <!-- Biodegradability bar -->
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-family:var(--fm);font-size:10px;color:var(--ink3)">🌿 BIODEGRADABILITY</span>
              <span style="font-family:var(--fm);font-size:11px;font-weight:700;color:#10B981">${bScore!==null?bScore+'%':'—'}</span>
            </div>
            <div style="height:7px;background:var(--s3);border-radius:4px;overflow:hidden">
              <div style="height:100%;width:${bScore||0}%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:4px;transition:width 1.2s ease"></div>
            </div>
          </div>
          ${ts?`<div style="margin-top:12px;font-family:var(--fm);font-size:10px;color:var(--ink3)">Last reading: ${new Date(ts).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}</div>`:''}
        </div>
      </div>
    </div>

    <!-- Overall running stats -->
    ${overall?`<div style="background:linear-gradient(135deg,rgba(200,75,10,.06),rgba(200,75,10,.02));border:1px solid rgba(200,75,10,.15);border-radius:20px;padding:24px;margin-bottom:28px">
      <div style="font-family:var(--fm);font-size:9px;color:var(--sf);letter-spacing:.2em;margin-bottom:16px">CUMULATIVE SESSION STATS</div>
      <div class="g4">
        ${[
          {v:overall.total_items_classified||0,l:'Items Classified',icon:'📦',c:'var(--sf)'},
          {v:(overall.avg_recyclability_score||0)+'%',l:'Avg Recyclability',icon:'♻️',c:'#3B82F6'},
          {v:(overall.avg_biodegradability_score||0)+'%',l:'Avg Biodegradability',icon:'🌿',c:'#10B981'},
          {v:fill!==null?fill+'%':'—',l:'Current Fill',icon:'📊',c:fillCol},
        ].map(s=>`<div class="sc" style="padding:20px 16px;text-align:center">
          <div style="font-size:24px;margin-bottom:10px">${s.icon}</div>
          <div style="font-family:var(--fd);font-size:clamp(1.4rem,3vw,2.2rem);font-weight:400;color:${s.c};letter-spacing:-1px;line-height:1;margin-bottom:6px">${typeof s.v==='number'?anHTML(s.v):s.v}</div>
          <div style="font-family:var(--fm);font-size:10px;color:var(--ink3);letter-spacing:.1em">${s.l.toUpperCase()}</div>
        </div>`).join('')}
      </div>
      ${overall.last_updated?`<div style="margin-top:12px;font-family:var(--fm);font-size:10px;color:var(--ink3);text-align:right">Updated: ${new Date(overall.last_updated).toLocaleString('en-IN')}</div>`:''}
    </div>`:''}

    <!-- Bin health indicator -->
    <div class="g2">
      <div class="card">
        <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.18em;margin-bottom:12px">BIN HEALTH</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${[
            {label:'Fill Level',value:fill!==null?fill+'%':'—',ok:fill!==null&&fill<80,warn:fill>=80,icon:'📊'},
            {label:'Weight',value:wt!==null?Math.round(wt)+'g':'—',ok:wt!==null&&wt<2000,warn:wt>=2000,icon:'⚖️'},
            {label:'Sensor',value:dist!==null?'Online':'Offline',ok:dist!==null,warn:false,icon:'📡'},
            {label:'Cloud Sync',value:S.proto.lastFetch?new Date(S.proto.lastFetch).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}):'Never',ok:!S.proto.err,warn:false,icon:'☁️'},
          ].map(row=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border)">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${row.icon}</span>
              <span style="font-size:13px;color:var(--ink2)">${row.label}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-family:var(--fm);font-size:12px;font-weight:600;color:var(--ink)">${row.value}</span>
              <div style="width:8px;height:8px;border-radius:50%;background:${row.warn?'#EF4444':row.ok?'#10B981':'#F59E0B'}"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Prototype info card -->
      <div class="card">
        <div style="font-family:var(--fm);font-size:9px;color:var(--ink3);letter-spacing:.18em;margin-bottom:12px">HARDWARE STACK</div>
        ${[
          {icon:'🔌',name:'Raspberry Pi',desc:'Edge compute + connectivity'},
          {icon:'📡',name:'HC-SR04 Ultrasonic',desc:'Fill level · 25cm range'},
          {icon:'⚖️',name:'HX711 Load Cell',desc:'Weight measurement'},
          {icon:'📷',name:'USB Camera',desc:'Waste classification via Groq AI'},
          {icon:'🧠',name:'Llama 4 Scout',desc:'Recyclability & bio scoring'},
          {icon:'☁️',name:'JSONBin.io',desc:'Real-time cloud storage'},
        ].map(h=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:16px;flex-shrink:0">${h.icon}</span>
          <div><div style="font-weight:600;font-size:13px">${h.name}</div>
          <div style="font-size:11px;color:var(--ink3)">${h.desc}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function rerender(){
  const root=document.getElementById('root');if(!root)return;
  destroyAllMaps();
  if(S.screen==='landing'){root.innerHTML=renderLanding();if(S.showAuth)root.innerHTML+=renderAuthModal();return;}
  let overlay='';if(S.showAuth)overlay=renderAuthModal();if(S.showLoc)overlay=renderLocationModal();
  let pageHTML='';
  if(S.page==='verify'&&S.actSess)pageHTML=renderVerifyFlow();
  else if(S.page==='scan')pageHTML=renderScanPage();
  else if(S.page==='iot')pageHTML=renderIoTPage();
  else if(S.page==='route')pageHTML=renderRoutePlanner();
  else if(S.page==='muni')pageHTML=renderMuniDashboard();
  else if(S.page==='admin')pageHTML=renderAdminDashboard();
  else if(S.page==='rewards')pageHTML=renderRewardsPage();
  else if(S.page==='prototype'||S.role==='prototype')pageHTML=renderPrototypePage();
  else if(S.page==='settings')pageHTML=renderSettingsPage();
  else if(S.role==='admin')pageHTML=renderAdminDashboard();
  else if(S.role==='municipality')pageHTML=renderMuniDashboard();
  else if(S.role==='collector')pageHTML=renderCollectorDash();
  else pageHTML=renderCitizenDash();
  root.innerHTML=`${renderTopNav()}<div class="main"><div class="page">${pageHTML}</div></div>${overlay}`;
  runCounters();initMapsForCurrentPage();setupFileInputs();setupIoTInterval();setupVerifyTimer();
}

function initMapsForCurrentPage(){
  const{page,role,userArea,collectorRoute:route,route:rs,muni:mu,iot}=S;const ua=userArea;
  if((page==='dashboard'||(!page&&role!=='collector'&&role!=='municipality'))&&document.getElementById('map-citizen')){const nearby=ua?nearbyBins(ua.lat,ua.lng,6):DELHI_BINS.slice(0,6);initMap('map-citizen',{bins:nearby,height:500,flyTo:ua});}
  if(page==='dashboard'&&role==='collector'&&document.getElementById('map-collector')){initMap('map-collector',{bins:DELHI_BINS,routeBins:route,height:520,flyTo:ua});}
  if(page==='route'&&!rs.showSPick&&document.getElementById('map-route')){const isRecycle=(rs.routeTab||'recycle')==='recycle';const activeRoute=isRecycle?S.collectorRoute:S.collectorBioRoute;let shown=[...DELHI_BINS].sort((a,b)=>isRecycle?(b.level-a.level):((b.bioLevel||0)-(a.bioLevel||0)));if(rs.filter==='crit')shown=shown.filter(x=>isRecycle?x.level>80:(x.bioLevel||0)>80);initMap('map-route',{bins:shown,routeBins:activeRoute,height:390,flyTo:rs.flyTo,startPoint:rs.startPoint,onBinClickFn:(bin)=>{if(isRecycle){if(S.collectorRoute.find(r=>r.id===bin.id)){S.collectorRoute=S.collectorRoute.filter(r=>r.id!==bin.id);}else{S.collectorRoute=[...S.collectorRoute,bin];}}else{if(S.collectorBioRoute.find(r=>r.id===bin.id)){S.collectorBioRoute=S.collectorBioRoute.filter(r=>r.id!==bin.id);}else{S.collectorBioRoute=[...S.collectorBioRoute,bin];}}rerender();}});}
  if((page==='muni'||role==='municipality')&&document.getElementById('map-muni')){const mShown=mu.selWard==='all'?DELHI_BINS:DELHI_BINS.filter(b=>b.ward===mu.selWard);initMap('map-muni',{bins:mShown,showHotspots:mu.mapMode==='hotspot',height:520,flyTo:mu.flyTo||ua});}
  if((page==='prototype'||role==='prototype')&&document.getElementById('map-proto')){const protoBin=[{id:999,name:'Nayi Disha Prototype',area:'Bharat Mandapam',lat:28.6212,lng:77.2106,level:S.proto.data&&S.proto.data.bin?Math.round(S.proto.data.bin.level||0):0,bioLevel:S.proto.data&&S.proto.data.bin?Math.round((S.proto.data.bin.biodegradability_score||0)*.8):0,type:'Mixed',ward:'New Delhi',status:'ok',recyclability:75,biodegradability:50,disposals60d:10}];initMap('map-proto',{bins:protoBin,height:380,flyTo:{lat:28.6212,lng:77.2106},fitAll:false,onBinClickFn:null});}
if(page==='iot'&&document.getElementById('map-iot')){initMap('map-iot',{bins:iot.bins,height:520,flyTo:null,fitAll:true,onBinClickFn:(bin)=>{S.iot.qrBin=bin;S.iot.qrScanned=false;S.iot.presenceStatus='idle';rerender();}});}
}

function setupFileInputs(){
  document.getElementById('scan-file-input').onchange=e=>{const f=e.target.files[0];if(!f||!f.type.startsWith('image/'))return;const r=new FileReader();r.onload=ev=>{S.scan={...S.scan,preview:ev.target.result,b64:ev.target.result.split(',')[1],mime:f.type,stage:'preview',err:''};rerender();};r.readAsDataURL(f);e.target.value='';};
  document.getElementById('scan-cam-input').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{S.scan={...S.scan,preview:ev.target.result,b64:ev.target.result.split(',')[1],mime:f.type,stage:'preview',err:''};rerender();};r.readAsDataURL(f);e.target.value='';};
  document.getElementById('proof-input').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{S.verify={...S.verify,prevPic:ev.target.result,proof:'captured'};rerender();};r.readAsDataURL(f);e.target.value='';};
}
function setupIoTInterval(){if(S.page!=='iot'){clearInterval(iotInterval);iotInterval=null;return;}if(iotInterval)return;iotInterval=setInterval(()=>{if(S.page!=='iot'){clearInterval(iotInterval);iotInterval=null;return;}S.iot.bins=S.iot.bins.map(b=>({...b,level:Math.min(100,Math.max(0,b.level+Math.floor(Math.random()*5-2))),bioLevel:Math.min(100,Math.max(0,(b.bioLevel||0)+Math.floor(Math.random()*5-2)))}));if(MAPS['map-iot'])updateMapLayers('map-iot',{bins:S.iot.bins,routeBins:[],showHotspots:false,startPoint:null,onBinClickFn:(bin)=>{S.iot.qrBin=bin;rerender();}});},3000);}
function setupVerifyTimer(){if(S.page!=='verify'||!S.actSess){clearInterval(verifyInterval);verifyInterval=null;return;}if(verifyInterval)return;verifyInterval=setInterval(()=>{if(S.page!=='verify'||!S.actSess){clearInterval(verifyInterval);verifyInterval=null;return;}S.verify.tLeft=Math.max(0,Math.floor((S.actSess.expiresAt-Date.now())/1000));if(S.verify.tLeft<=0&&S.verify.step<4){S.verify.step=-1;S.verify.failR="Session expired.";clearInterval(verifyInterval);verifyInterval=null;rerender();}},1000);}

function goPrototype(){S.screen='app';S.role='prototype';S.page='prototype';S.showAuth=false;S.showLoc=false;S.currentUser={name:'Prototype Viewer',contact:'prototype',role:'prototype',id:'PROTO',pts:0};blast();rerender();fetchProtoData();}
function openAuth(role){S.showAuth=true;S.authPreRole=role;if(role)S.authRole=role;rerender();}
function closeAuth(){S.showAuth=false;rerender();}
function openLocModal(){S.showLoc=true;rerender();}
function locGPS(){S.locMode='gps';S.locGps='loading';rerender();if(!navigator.geolocation){S.locGps='error';S.locMode='area';rerender();return;}navigator.geolocation.getCurrentPosition(pos=>{const{latitude:lat,longitude:lng}=pos.coords;const nearest=[...DELHI_AREAS].sort((a,b)=>haversine(lat,lng,a.lat,a.lng)-haversine(lat,lng,b.lat,b.lng))[0];S.locSel={...nearest,gpsLat:lat,gpsLng:lng};S.locGps='done';rerender();},()=>{S.locGps='error';S.locMode='area';rerender();},{timeout:8000});}
function confirmLocation(){S.userArea=S.locSel;S.showLoc=false;S.route.startPoint=S.locSel;rerender();}
function navigate(page){S.page=page;clearInterval(iotInterval);iotInterval=null;clearInterval(verifyInterval);verifyInterval=null;clearTimeout(_protoTimer);_protoTimer=null;if(page==='prototype'){fetchProtoData();}cloudSync();rerender();}
function gotoPendingSession(){if(S.pSess.length){S.actSess=S.pSess[0];S.page='verify';S.verify={step:1,tLeft:Math.max(0,Math.floor((S.pSess[0].expiresAt-Date.now())/1000)),proof:null,prevPic:null,failR:'',busy:false,qrModal:false};rerender();}}
function resetScan(){const k=S.scan.apiKey,ks=S.scan.keyStatus;S.scan={stage:'idle',preview:null,b64:null,mime:'image/jpeg',result:null,err:'',prog:0,apiKey:k,keyStatus:ks};rerender();}
async function analyzeScan(){S.scan.stage='scanning';S.scan.prog=0;rerender();const iv=setInterval(()=>{S.scan.prog=Math.min(90,S.scan.prog+Math.random()*7);},280);try{const res=await classifyWaste(S.scan.b64,S.scan.mime);clearInterval(iv);S.scan.prog=100;setTimeout(()=>{S.scan.result=res;S.scan.stage='result';rerender();},400);}catch(e){clearInterval(iv);S.scan.err=`AI analysis failed: ${e.message}`;S.scan.stage='error';rerender();}}
function startVerify(){if(!S.scan.result)return;const pts=S.scan.result.points||WASTE_META[S.scan.result.category]?.pts||5;const bin=S.userArea?nearbyBins(S.userArea.lat,S.userArea.lng,1)[0]:DELHI_BINS[0];const sess={id:genId(),token:genToken(),wasteResult:S.scan.result,pendingPoints:pts,assignedBin:bin,createdAt:Date.now(),expiresAt:Date.now()+3600*1000};S.pSess=[...S.pSess,sess];S.pPts+=pts;S.actSess=sess;S.verify={step:1,tLeft:3600,proof:null,prevPic:null,failR:'',busy:false,qrModal:false};S.page='verify';resetScan();rerender();}
function instantClaim(){if(!S.scan.result)return;const pts=S.scan.result.points||WASTE_META[S.scan.result.category]?.pts||5;S.cPts+=pts;if(S.currentUser){S.currentUser.pts=S.cPts;S.currentUser.scans=(S.currentUser.scans||0)+1;S.currentUser.lastActive=Date.now();const _ul=loadUsers();const _ui=_ul.findIndex(u=>u.id===S.currentUser.id);if(_ui>=0){_ul[_ui].pts=S.cPts;_ul[_ui].scans=S.currentUser.scans;_ul[_ui].lastActive=Date.now();localStorage.setItem('nd_users',JSON.stringify(_ul));}}cloudSync();blast();resetScan();}
function verifyStep(n){S.verify.step=n;cloudSync();rerender();}
function simulateProof(){S.verify.proof='sim';rerender();}
function submitProof(){S.verify.busy=true;rerender();setTimeout(()=>{if(!S.actSess)return;const bonus=Math.round(S.actSess.pendingPoints*.2);S.cPts+=S.actSess.pendingPoints+bonus;S.pPts=Math.max(0,S.pPts-S.actSess.pendingPoints);S.pSess=S.pSess.filter(s=>s.id!==S.actSess.id);S.verify.step=4;S.verify.busy=false;clearInterval(verifyInterval);verifyInterval=null;if(S.currentUser){S.currentUser.pts=S.cPts;S.currentUser.verifications=(S.currentUser.verifications||0)+1;S.currentUser.lastActive=Date.now();const _ul=loadUsers();const _ui=_ul.findIndex(u=>u.id===S.currentUser.id);if(_ui>=0){_ul[_ui].pts=S.cPts;_ul[_ui].verifications=S.currentUser.verifications;_ul[_ui].lastActive=Date.now();localStorage.setItem('nd_users',JSON.stringify(_ul));}}cloudSync();blast();rerender();setTimeout(()=>{S.actSess=null;navigate('dashboard');},2500);},2000);}
function addBioRouteBin(id){const bin=DELHI_BINS.find(b=>b.id===id);if(!bin||S.collectorBioRoute.find(r=>r.id===id))return;S.collectorBioRoute=[...S.collectorBioRoute,bin];S.route.flyTo={lat:bin.lat,lng:bin.lng};rerender();}
function removeBioRouteBin(id){S.collectorBioRoute=S.collectorBioRoute.filter(b=>b.id!==id);rerender();}
function clearBioRoute(){S.collectorBioRoute=[];S.route.bioStarted=false;S.route.bioOptMsg='';rerender();}
function startBioRoute(){S.route.bioStarted=true;rerender();}
function addAllBioCritical(){S.collectorBioRoute=DELHI_BINS.filter(b=>(b.bioLevel||0)>80);S.route.bioOptMsg='';rerender();}
function addAllRecycleCritical(){S.collectorRoute=DELHI_BINS.filter(b=>b.level>80);S.route.optMsg='';rerender();}
function optimizeBioRoute(){const route=S.collectorBioRoute;if(route.length<2)return;const startRef=S.route.startPoint||{lat:route[0].lat,lng:route[0].lng};const rem=[...route];let startIdx=0,minD=Infinity;rem.forEach((b,i)=>{const d=haversine(startRef.lat,startRef.lng,b.lat,b.lng);if(d<minD){minD=d;startIdx=i;}});const opt=[rem.splice(startIdx,1)[0]];while(rem.length){const cur=opt[opt.length-1];let ni=0,nd=Infinity;rem.forEach((b,i)=>{const d=haversine(cur.lat,cur.lng,b.lat,b.lng);if(d<nd){nd=d;ni=i;}});opt.push(rem.splice(ni,1)[0]);}const before=routeDist(route),after=routeDist(opt);S.collectorBioRoute=opt;S.route.bioOptMsg=`Optimized: ${before.toFixed(1)} km → ${after.toFixed(1)} km`;rerender();}
function setRouteFilter(f){S.route.filter=f;rerender();}
function setRouteArea(a){S.route.areaF=a;rerender();}
function addRouteBin(id){const bin=DELHI_BINS.find(b=>b.id===id);if(!bin||S.collectorRoute.find(r=>r.id===id))return;S.collectorRoute=[...S.collectorRoute,bin];S.route.flyTo={lat:bin.lat,lng:bin.lng};rerender();}
function removeRouteBin(id){S.collectorRoute=S.collectorRoute.filter(b=>b.id!==id);rerender();}
function setRouteHover(id,lat,lng){S.route.hoverId=id;if(id&&MAPS['map-route'])MAPS['map-route'].map.panTo([lat,lng]);}
function addAllCritical(){S.collectorRoute=DELHI_BINS.filter(b=>b.level>80);S.route.optMsg='';rerender();}
function clearRoute(){S.collectorRoute=[];S.route.started=false;S.route.optMsg='';rerender();}
function startRoute(){S.route.started=true;rerender();}
function optimizeRoute(){const route=S.collectorRoute;if(route.length<2)return;const startRef=S.route.startPoint||{lat:route[0].lat,lng:route[0].lng};const rem=[...route];let startIdx=0,minD=Infinity;rem.forEach((b,i)=>{const d=haversine(startRef.lat,startRef.lng,b.lat,b.lng);if(d<minD){minD=d;startIdx=i;}});const opt=[rem.splice(startIdx,1)[0]];while(rem.length){const cur=opt[opt.length-1];let ni=0,nd=Infinity;rem.forEach((b,i)=>{const d=haversine(cur.lat,cur.lng,b.lat,b.lng);if(d<nd){nd=d;ni=i;}});opt.push(rem.splice(ni,1)[0]);}const before=routeDist(route),after=routeDist(opt);S.collectorRoute=opt;S.route.optMsg=`Optimized: ${before.toFixed(1)} km → ${after.toFixed(1)} km`;rerender();}
function showStartPicker(){S.route.showSPick=true;rerender();}
function setRouteStart(areaId){const area=DELHI_AREAS.find(a=>a.id===areaId);if(!area)return;S.route.startPoint=area;S.route.showSPick=false;if(S.collectorRoute.length===0)addAllCritical();rerender();}
function useGPSStart(){if(!navigator.geolocation){alert('GPS not available');return;}navigator.geolocation.getCurrentPosition(pos=>{const{latitude:lat,longitude:lng}=pos.coords;const nearest=[...DELHI_AREAS].sort((a,b)=>haversine(lat,lng,a.lat,a.lng)-haversine(lat,lng,b.lat,b.lng))[0];S.route.startPoint={...nearest,lat,lng};S.route.showSPick=false;if(S.collectorRoute.length===0)S.collectorRoute=DELHI_BINS.filter(b=>b.level>80);rerender();},()=>alert('GPS error'));}
function collectorFlyTo(lat,lng){flyToMap('map-collector',lat,lng);}
function setMuniMode(mode){S.muni.mapMode=mode;rerender();}
function setMuniWard(ward){S.muni.selWard=ward;rerender();}
function muniFlyo(lat,lng){S.muni.flyTo={lat,lng};flyToMap('map-muni',lat,lng);}
function setIotFilter(f){S.iot.filt=f;rerender();}
function iotSearch(val){S.iot.search=val;document.querySelectorAll('[data-bin-row]').forEach(el=>{const name=(el.dataset.binName||'').toLowerCase();const area=(el.dataset.binArea||'').toLowerCase();const q=val.toLowerCase().trim();el.style.display=(!q||name.includes(q)||area.includes(q))?'':' none';});}
function openIotQR(id){if(!S.currentUser){S.showAuth=true;S.authPreRole='citizen';S.authRole='citizen';S.authForm={name:'',contact:'',password:'',secQ:'',secA:'',err:'Please log in to scan a bin and earn WasteCoins.'};rerender();return;}S.iot.qrBin=DELHI_BINS.find(b=>b.id===id)||null;S.iot.qrScanned=false;S.iot.presenceStatus='idle';rerender();}
function closeIotQR(){S.iot.qrBin=null;S.iot.qrScanned=false;S.iot.presenceStatus='idle';rerender();}
function confirmPresence(){const bin=S.iot.qrBin;if(!bin||S.iot.presenceStatus==='done')return;const pts=50;S.cPts+=pts;S.presenceLog.unshift({id:genId(),binId:bin.id,binName:bin.name,area:bin.area,ward:bin.ward,level:bin.level,type:bin.type,user:S.currentUser?.name||'Citizen',role:'citizen',pts,ts:Date.now()});S.iot.presenceStatus='done';if(S.currentUser){S.currentUser.pts=S.cPts;S.currentUser.lastActive=Date.now();const _ul=loadUsers();const _ui=_ul.findIndex(u=>u.id===S.currentUser.id);if(_ui>=0){_ul[_ui].pts=S.cPts;_ul[_ui].lastActive=Date.now();localStorage.setItem('nd_users',JSON.stringify(_ul));}}cloudSync();rerender();}
function deleteUser(id){if(!confirm('⚠️ Remove this user permanently? This will also delete them from the cloud.'))return;if(S.currentUser&&S.currentUser.id===id){alert('Cannot remove your own account while logged in.');return;}const users=loadUsers().filter(u=>u.id!==id);try{localStorage.setItem('nd_users',JSON.stringify(users));}catch(e){}const payload={meta:{version:'v4.3',city:'Delhi NCT',updatedAt:new Date().toISOString(),syncedBy:S.currentUser?S.currentUser.name:'admin'},users:users.map(function(u){return{id:u.id,name:u.name,contact:u.contact,password:u.password,role:u.role,securityQuestion:u.securityQuestion||'',securityAnswer:u.securityAnswer||'',pts:u.pts||0,scans:u.scans||0,verifications:u.verifications||0,joinedAt:u.joinedAt,lastActive:u.lastActive||u.joinedAt};}),presenceLog:S.presenceLog.slice(0,200),sessionStats:{totalUsers:users.length,totalCheckins:S.presenceLog.length,totalWasteCoins:users.reduce(function(s,u){return s+(u.pts||0);},0),roles:{citizen:users.filter(function(u){return u.role==='citizen';}).length,collector:users.filter(function(u){return u.role==='collector';}).length,municipality:users.filter(function(u){return u.role==='municipality';}).length,admin:users.filter(function(u){return u.role==='admin';}).length}}};fetch('https://api.jsonbin.io/v3/b/'+JSONBIN_ID,{method:'PUT',headers:{'Content-Type':'application/json','X-Master-Key':JSONBIN_KEY,'X-Bin-Private':'false'},body:JSON.stringify(payload)}).then(function(r){showSyncBadge(r.ok?'✓ User removed from cloud':'⚠ Cloud sync failed');}).catch(function(){showSyncBadge('⚠ Offline — local delete only');});rerender();}
function redeemPerk(id){const p=PERKS.find(x=>x.id===id);if(!p||S.cPts<p.pts)return;S.cPts=Math.max(0,S.cPts-p.pts);S.rewards.toast=p;if(S.currentUser){S.currentUser.pts=S.cPts;S.currentUser.lastActive=Date.now();const _ul=loadUsers();const _ui=_ul.findIndex(u=>u.id===S.currentUser.id);if(_ui>=0){_ul[_ui].pts=S.cPts;_ul[_ui].lastActive=Date.now();localStorage.setItem('nd_users',JSON.stringify(_ul));}}cloudSync();rerender();setTimeout(()=>{S.rewards.toast=null;rerender();},3000);}
function toggleNotif(k){S.settings.notifs[k]=!S.settings.notifs[k];rerender();}
function setLang(l){S.settings.lang=l;rerender();}
function logout(){cloudSync(true);destroyAllMaps();clearInterval(iotInterval);clearInterval(verifyInterval);iotInterval=null;verifyInterval=null;S={...S,screen:'landing',role:'citizen',page:'dashboard',cPts:0,pPts:0,pSess:[],actSess:null,collectorRoute:[],sbOpen:false,userArea:null,showLoc:false,showAuth:false,authPreRole:null,currentUser:null};rerender();}
function saveJsonBinConfig(){const key=(document.getElementById('jb-key')||{value:''}).value.trim();if(!key){setJBStatus('Enter your X-Master-Key','var(--rd)');return;}try{localStorage.setItem('nd_jb_key',key);}catch(e){}window._JSONBIN_KEY=key;setJBStatus('Testing…','var(--ink3)');fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`,{headers:{'X-Master-Key':key}}).then(r=>r.json()).then(d=>{if(d.record!==undefined){setJBStatus('✓ Connected! Cloud sync active.','var(--gr)');cloudSync();}else{setJBStatus('Failed — check credentials.','var(--rd)');}}).catch(()=>setJBStatus('Network error.','var(--rd)'));}
function setJBStatus(msg,color){const el=document.getElementById('jb-status');if(el){el.textContent=msg;el.style.color=color;}}
function forceSyncToCloud(){cloudSync();setJBStatus('Syncing…','var(--ink3)');setTimeout(()=>setJBStatus('✓ Sync complete — '+new Date().toLocaleTimeString('en-IN'),'var(--gr)'),1200);}
function continueSession(id){const s=S.pSess.find(x=>x.id===id);if(!s)return;S.actSess=s;S.page='verify';S.verify={step:1,tLeft:Math.max(0,Math.floor((s.expiresAt-Date.now())/1000)),proof:null,prevPic:null,failR:'',busy:false,qrModal:false};rerender();}

function generateQRDataURL(text,size=200){try{const div=document.createElement('div');new QRCode(div,{text,width:size,height:size,colorDark:'#0E0C09',colorLight:'#FDFBF8',correctLevel:QRCode.CorrectLevel.M});const canvas=div.querySelector('canvas');if(canvas)return canvas.toDataURL('image/png');}catch(e){}return'';}
function binQRUrl(binId){return`https://nayidishaprototype4.oneapp.dev/?bin=${binId}`;}
function binQRImg(bin,size=200){const url=binQRUrl(bin.id);const d=generateQRDataURL(url,size);if(!d)return mockQRSVG(`BIN-${bin.id}`,size);return`<div style="background:#FDFBF8;padding:16px;border-radius:16px;display:inline-block;box-shadow:var(--shadow-md)"><img src="${d}" width="${size}" height="${size}" style="display:block;border-radius:8px"/><div style="font-family:var(--fm);font-size:9px;color:var(--ink3);text-align:center;margin-top:10px">BIN-${String(bin.id).padStart(3,'0')} · ${esc(bin.area).toUpperCase()}</div></div>`;}


function initSplashCanvas(){
  var cv = document.getElementById('splash-canvas');
  if(!cv) return;
  var cx = cv.getContext('2d');
  var W, H, raf, t0 = performance.now();

  /* colour palette: tricolor + fire */
  var PAL = [
    [255,155, 60],[220, 80, 12],[200, 70,  8],
    [255,185, 80],[255,115, 40],[255,255,255],
    [ 19,136,  8],[100,200, 80]
  ];

  function resize(){ W=cv.width=innerWidth; H=cv.height=innerHeight; }
  resize();
  addEventListener('resize', resize);

  /* ── 1. STAR FIELD: two layers at different depths ── */
  var STARS = [];
  for(var k=0;k<180;k++){
    var c=PAL[k%PAL.length];
    var z = Math.random(); // depth 0..1
    STARS.push({
      x:Math.random(), y:Math.random(),
      r:z*(0.3+Math.random()*2.8),
      vx:(Math.random()-.5)*.00015*z,
      vy:-.00012-.0006*z,
      a:0.05+Math.random()*.55,
      c:c, ph:Math.random()*6.28,
      spd:0.006+Math.random()*.025,
      twinkle:Math.random()>.55
    });
  }

  /* ── 2. LIGHT STREAKS (horizontal lens flares) ── */
  var STREAKS=[];
  for(var s=0;s<8;s++){
    STREAKS.push({
      y  : .18+Math.random()*.68,
      xf : Math.random(),
      w  : 60+Math.random()*250,
      a  : 0,
      ta : .025+Math.random()*.06,
      vx : (.0002+Math.random()*.0006)*(Math.random()>.5?1:-1),
      col: Math.random()>.4
        ?'255,'+(100+Math.floor(Math.random()*80))+',40'
        :'255,255,255'
    });
  }

  /* ── 3. EMBERS: small sparks rising from bottom ── */
  var EMBERS=[];
  for(var e=0;e<35;e++){
    EMBERS.push({
      x:Math.random(), y:.8+Math.random()*.25,
      r:.8+Math.random()*2,
      vy:-.0006-.002*Math.random(),
      vx:(Math.random()-.5)*.0008,
      a:.3+Math.random()*.6,
      life:Math.random(), lifeSpd:.002+Math.random()*.004
    });
  }

  function draw(){
    raf = requestAnimationFrame(draw);
    var now = performance.now();
    var dt  = Math.min((now - t0) * .001, 3); // clamp to 3s max
    t0 = now;

    cx.clearRect(0,0,W,H);

    /* deep background gradient */
    var bg=cx.createRadialGradient(W*.5,H*.44,0,W*.5,H*.44,W*.65);
    bg.addColorStop(0,  'rgba(175,58,5,.22)');
    bg.addColorStop(.38,'rgba(130,42,3,.10)');
    bg.addColorStop(.72,'rgba(70,20,2,.04)');
    bg.addColorStop(1,  'transparent');
    cx.fillStyle=bg; cx.fillRect(0,0,W,H);

    /* secondary glows */
    var gl=[[.1,.85,'rgba(200,80,15,.06)',.28],[.9,.15,'rgba(255,160,50,.04)',.22]];
    gl.forEach(function(g){
      var r=cx.createRadialGradient(W*g[0],H*g[1],0,W*g[0],H*g[1],W*g[3]);
      r.addColorStop(0,g[2]); r.addColorStop(1,'transparent');
      cx.fillStyle=r; cx.fillRect(0,0,W,H);
    });

    /* ── TRICOLOR RAYS (3 per group, 2 groups rotating opposite) ── */
    [
      {spd:.016, spread:.55, cols:['rgba(255,120,30,.055)','rgba(255,255,255,.016)','rgba(19,136,8,.055)']},
      {spd:-.009,spread:.35, cols:['rgba(255,90,10,.025)', 'rgba(255,255,255,.007)','rgba(10,100,4,.025)']}
    ].forEach(function(grp){
      var ang = now*.001*grp.spd;
      grp.cols.forEach(function(col,ri){
        cx.save();
        cx.translate(W*.5,H*.52);
        cx.rotate(-grp.spread+ri*grp.spread+ang);
        cx.beginPath();
        cx.moveTo(0,0);
        cx.lineTo(-W*2.5,-H*3.5);
        cx.lineTo( W*2.5,-H*3.5);
        cx.closePath();
        cx.fillStyle=col; cx.fill();
        cx.restore();
      });
    });

    /* ── LIGHT STREAKS ── */
    STREAKS.forEach(function(sk){
      sk.xf+=sk.vx;
      if(sk.xf<-.1) sk.xf=1.1;
      if(sk.xf>1.1)  sk.xf=-.1;
      sk.a+=(sk.ta-sk.a)*.015;
      var sx=sk.xf*W, sy=sk.y*H;
      var sg=cx.createLinearGradient(sx-sk.w,sy,sx+sk.w,sy);
      sg.addColorStop(0,'transparent');
      sg.addColorStop(.5,'rgba('+sk.col+','+sk.a+')');
      sg.addColorStop(1,'transparent');
      cx.fillStyle=sg;
      cx.fillRect(sx-sk.w,sy-.8,sk.w*2,1.6);
    });

    /* ── STAR PARTICLES ── */
    STARS.forEach(function(p){
      p.ph+=p.spd; p.x+=p.vx; p.y+=p.vy;
      if(p.y<-.01){ p.y=1.01; p.x=Math.random(); }
      if(p.x<-.01) p.x=1.01;
      if(p.x>1.01) p.x=-.01;
      var flick=p.twinkle?(.4+.6*Math.abs(Math.sin(p.ph*1.9))):(.72+.28*Math.sin(p.ph));
      var a=p.a*flick;
      cx.globalAlpha=a;
      cx.beginPath();
      cx.arc(p.x*W,p.y*H,p.r,0,6.28);
      cx.fillStyle='rgb('+p.c[0]+','+p.c[1]+','+p.c[2]+')';
      cx.fill();
      if(p.r>1.6){
        cx.globalAlpha=a*.18;
        cx.beginPath();
        cx.arc(p.x*W,p.y*H,p.r*4.5,0,6.28);
        cx.fill();
      }
      /* sparkle cross on bright twinkling stars */
      if(p.twinkle && p.r>2.2 && flick>.9){
        cx.globalAlpha=a*.5;
        cx.strokeStyle='rgb('+p.c[0]+','+p.c[1]+','+p.c[2]+')';
        cx.lineWidth=.6;
        var L=p.r*6;
        cx.beginPath();
        cx.moveTo(p.x*W-L,p.y*H); cx.lineTo(p.x*W+L,p.y*H);
        cx.moveTo(p.x*W,p.y*H-L); cx.lineTo(p.x*W,p.y*H+L);
        cx.stroke();
      }
    });

    /* ── EMBERS (rising heat from bottom) ── */
    EMBERS.forEach(function(em){
      em.x+=em.vx; em.y+=em.vy; em.life+=em.lifeSpd;
      if(em.life>1||em.y<-.05){
        em.x=Math.random(); em.y=.82+Math.random()*.2;
        em.life=0;
      }
      var fade=em.life<.2?em.life/.2:em.life>.7?(1-em.life)/.3:1;
      cx.globalAlpha=em.a*fade*.7;
      cx.beginPath();
      cx.arc(em.x*W,em.y*H,em.r*(1-em.life*.3),0,6.28);
      cx.fillStyle='rgb('+[255,Math.floor(100+em.life*80),20]+')';
      cx.fill();
    });

    /* ── VIGNETTE ── */
    cx.globalAlpha=1;
    var vig=cx.createRadialGradient(W*.5,H*.5,H*.22,W*.5,H*.5,H*.92);
    vig.addColorStop(0,'transparent');
    vig.addColorStop(.65,'transparent');
    vig.addColorStop(1,'rgba(3,1,0,.62)');
    cx.fillStyle=vig; cx.fillRect(0,0,W,H);
  }

  draw();
  window._stopSplashCanvas=function(){
    cancelAnimationFrame(raf);
    removeEventListener('resize',resize);
  };
}



function createReel2(onDone){
  var el=document.createElement('div');
  el.id='reel2';
  el.innerHTML=`<div class="r2-wrap"><div class="r2-eyebrow">Nayi Disha &nbsp;·&nbsp; नयी दिशा &nbsp;·&nbsp; New Direction</div><div class="r2-quote"><span class="w" style="animation-delay:0.18s">Every</span> <span class="w" style="animation-delay:0.252s">piece</span> <span class="w" style="animation-delay:0.324s">of</span> <span class="w" style="animation-delay:0.396s">waste</span> <span class="w" style="animation-delay:0.468s">tells</span> <span class="w" style="animation-delay:0.54s">a</span> <span class="w" style="animation-delay:0.612s">story</span> <span class="w" style="animation-delay:0.684s">—</span> <span class="w" style="animation-delay:0.756s">we</span> <span class="w" style="animation-delay:0.828s">make</span> <span class="w" style="animation-delay:0.9s">sure</span> <span class="w" style="animation-delay:0.972s">Delhi's</span> <span class="w" style="animation-delay:1.044s">story</span> <span class="w" style="animation-delay:1.116s">ends</span> <span class="w" style="animation-delay:1.188s">in</span> <span class="w" style="animation-delay:1.26s">renewal.</span></div><div class="r2-line-div"></div><div class="r2-goals"><span class="r2-chip sf">📷 AI Waste Classification</span><span class="r2-chip">📡 60 Live IoT Sensors</span><span class="r2-chip gr">♻️ WasteCoins Rewards</span><span class="r2-chip">🗺️ Smart Route Planning</span><span class="r2-chip sf">🏛️ Municipality Command</span><span class="r2-chip gr">🇮🇳 Swachh Bharat</span></div><div class="r2-attr">Delhi NCT &nbsp;·&nbsp; v4.3 &nbsp;·&nbsp; 2026</div></div><div class="r2-bar"></div>`;
  el.addEventListener('click',function(){dismissReel2(el,onDone);});
  document.body.appendChild(el);
  var autoT=setTimeout(function(){dismissReel2(el,onDone);},5500);
  el._autoT=autoT;
}
function dismissReel2(el,onDone){
  if(el._gone)return;
  el._gone=true;
  clearTimeout(el._autoT);
  el.style.clipPath='none';el.style.animation='r2Out .8s cubic-bezier(.4,0,.2,1) forwards';
  setTimeout(function(){if(el.parentNode)el.remove();if(typeof onDone==='function')onDone();},820);
}


(function createSplash(){
  document.body.classList.add('splash-active');
  const el=document.createElement('div');el.id='splash';
  el.innerHTML=`<canvas id="splash-canvas"></canvas><div class="sp-w sp-w1"><div class="sp-mask"><span>Waste,</span></div></div><div class="sp-w sp-w2"><div class="sp-mask"><span>Reimagined.</span></div></div><div class="sp-w sp-w3"><div class="sp-mask"><span>FOR DELHI &nbsp;·&nbsp; नयी दिशा</span></div></div><div class="sp-tag"><div class="sp-dot" style="background:#FF9933;box-shadow:0 0 8px rgba(255,153,51,.5)"></div><span class="sp-pill">v4.3 · DELHI NCT · 60 IOT BINS</span><div class="sp-dot" style="background:#138808;box-shadow:0 0 8px rgba(19,136,8,.5)"></div></div><div class="sp-bar"></div>`;initSplashCanvas();
  el.addEventListener('click',dismissSplash);document.body.appendChild(el);
})();

function dismissSplash(){var s=document.getElementById('splash');if(!s||s.dataset.gone)return;if(window._stopSplashCanvas)window._stopSplashCanvas();s.dataset.gone='1';createReel2(function(){rerender();});s.style.animation='splashToReel 0.85s cubic-bezier(.4,0,.2,1) forwards';setTimeout(function(){if(s.parentNode)s.remove();document.body.classList.remove('splash-active');},900);}


cloudLoad();
setTimeout(dismissSplash,2800);
