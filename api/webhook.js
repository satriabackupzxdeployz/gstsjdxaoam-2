const axios = require("axios");

// ─── ENV ONLY - NO HARDCODE ───────────────────────────────────────────────────
const BOT_TOKEN = process.env.BOT_TOKEN;
const API_KEY   = process.env.THERESAV_APIKEY;
const OWNER_ID  = process.env.OWNER_ID || "8656325799";

if (!BOT_TOKEN) throw new Error("BOT_TOKEN env tidak di-set!");
if (!API_KEY)   throw new Error("THERESAV_APIKEY env tidak di-set!");

const TG = `https://api.telegram.org/bot${BOT_TOKEN}`;
const THERESAV = "https://api.theresav.biz.id";

// ─── VALID DOMAINS (dari plugin WA) ──────────────────────────────────────────
const VALID_DOMAINS = [
  "pipmmotube.store","1.lekeliusak.icu","1.ococugk.lat","11jac.com","120181311.xyz",
  "12bclass.us","1820mail.vip","24hhost.cc","2b9s.dev","5xu.vn","5yaochu.top",
  "67899vip.com","72p6.livetv.biz.id","816qs.com","917834.mailvip.net","91tanhua.top",
  "a2.kuro24in.lat","abis.patok.online","aboc.inboxku.site","adasd.cc","aecmedya.com",
  "afse-gh.top","ahre.tomoos.web.id","aiqoe.com","ajinimoto.me","akeey.biz.id",
  "akuadalah.dev","alog.vipportal.online","amazinggift.life","arlia.ink","arthiq.life",
  "aruf.melakoni.web.id","asistx.net","au1688x.us","automizelymail.info","autommo.net",
  "aw.ferd.live","awawawaw.me","b.capricornh.my.id","b5ve4j.sekeba.web.id","bb28.dev",
  "bbasky.us","beautyshine.club","bjork.wtf","bjorwi.cfd","blendlog.com","bn77fb.click",
  "bolor7x.natshomulam.online","bosakun.com","bossmanjack.xyz","bqaz.xyz",
  "brittneyus.biz.id","btcmod.com","buddyfly.top","c-newstv.ru","c-pkk.icu",
  "cangcutku.pro","capcut.digital","capcutgw.cfd","capcutku.cc","capcutmeflo.shop",
  "capcvt.es","casaderta.com","cba-1.top","cepo63.eu.org","chaocosen.com","chatech.site",
  "chatgptku.pro","checkback.vn","checkotpmail.com","chundage.help","clonetrust.com",
  "cloudserver.email","code.omeprone.biz.id","coffeepancakewafflebacon.com",
  "cogil.diypinnacademy.my.id","cryptoavalonsolhub.cloud","cuong.bid","cuongaquarium.com",
  "cyberdigital.site","cyjd.top","daemonixgames.com","datapinacle.com","dedisutardi.eu.org",
  "degar.xyz","dewacid.store","digitalcompany.web.id","digitecy.live","djiv.xyz","dmxs8.com",
  "docbao7.com","donusumekatil.com","dotos.dev","dracin.https443.net","dramamixio.icu",
  "drix.premiuw.top","ds4kojima.com","dtxinchao.name.vn","duosakhiy.com","duriancompany.us",
  "duyquyen.site","eastmm.cc","easygbd.cn","easygbd.com","edudingy.cfd","eelraodo.com",
  "ekot.xyz","eliksir.foo","emailmultimedia.com","enyashan.cfd","etisalat77.shop",
  "evrnext.com","fajskdlh.top","fazendabrasil1.com","feelmyheartwithsong.com",
  "feynorasu.dev","fitbuybid.com","gamersdady.com","gasolina.web.id",
  "gdbt.mailccconsequuntur.my.id","gdqoe.net","gen.getotp.live","getol.pro",
  "ghch.deegitalist.web.id","ghk55.us","giangholang.xyz","gima.my.id","gimail.cloud",
  "gmai1.kr","gmailot.com","gmali.my.id","goldenmagpies.com","goldinbox.net",
  "gomailgo.click","gtgstoreid.com","hahaha.vn","hanmama.zz.am","haodage.cc",
  "haoyunlaiba.cc","hdcroom.us","hddd54.shop","henrikoffice.us","herilev.top","hieu.in",
  "highstudios.net","higuruma.site","himkinet.ru","hitbase.net","hkvtop.us",
  "hotmail-us.top","hotmeil.net","hs-use.top","hvtlp.bekasi.me","iapermisul.ro",
  "idssh.net","inly.vn","isekai.web.id","ivqfo.kenma.online","jankolus.biz.id",
  "jasonpost.site","javaka.live","jeffrivod.my.id","jieluv.com","kantclass.com",
  "kapten.site","kayfilms.top","keepmail.dev","kelinganja.eu.org","kevidixjr.biz.id",
  "key2info.com","kia-sdn.me","killlove.site","kimbu.net","king.marc93.qpon",
  "kinggpt-g2g.biz.id","kitap.az","konterkulo.com","lamak.my.id","lellolidk.de",
  "likebaiviet.com","likevip.net","linkbm.one","live8.njesz.com","liveyoutube.my.id",
  "locmedia.asia","lookbek.cfd","luonglanhlung.com","luyeeisntyours.pro","mail.sedut.my",
  "mail.uinpalopo.my.id","mailcuatoi.click","maildy.site","mailhvd.lat","mailkryza.online",
  "mailllshop.website","maizystore.me","maxclone.vn","maxseeding.vn","meekuah.biz.id",
  "meevpo.site","mefp.xyz","meno.gajelaslu.biz.id","miisedapp.biz.id","mkda9884.top",
  "mlemmlem.asia","mobiarmy3.vn","mobilex.sbs","moga.portalespro.online",
  "morizamail.my.id","musiku.studio","my-mail.giize.com","mytempmail.org","nangspa.vn",
  "nautonk.com","naver-mail.com","ndut.pro","neosstudy.work","netflixollo.iya.my.id",
  "nevanata.com","nichely.sbs","nicoleir.biz.id","nightfood.studio","novaix.vn",
  "novaopcj.icu","nowtopzen.com","ntcapcut.biz.id","ntl.zyns.com","nyawitt.my.id",
  "obeg.sachtai.site","okmabuiyak.tech","onlyu.link","opelkun.net","ourl.me",
  "palcodovinho.com.br","penghuan.pro","phctool.com","phimteen.net","phpto.us","phubt.com",
  "piyo.my.id","pizzanow.sbs","potatocompany.us","poweradxas.online",
  "pqnej.entama.asia","pri.kse.skin","priasoloitulagi.my.id","prime-gaming.ru","promx.cc",
  "prosperidademail.com","putrimeilani.my.id","qavexo.site","qhsm.capcutkimak.tech",
  "quanpzo.click","r9ue.mailccomnis.my.id","raveqxon.site","registermc.online",
  "regvippro.site","renewable0.shop","riazra.bond","riko.my","risma.mom","riyadi.online",
  "sajutadollars.com","sanfnges.cc","saxlift.us","scatterteam.com","scire.sbs","scook.cfd",
  "sddrs-cdfs.shop","seci.risaon.biz.id","secondbrain.my.id","securebox01.click",
  "sekotong.store","selftrak.fit","semutireng.com","ses4services.net",
  "seti.jacobon.web.id","shanhaijuli.sbs","share.lopes.asia","ship79.com","shoha.cc",
  "shopcaunho.com","shopppy.shop","shopy.club","sinbox.asia","siroja.top",
  "sjgn.williamat.my.id","sjusngde.info","slcr.xyz","smakit.vn","small680.online",
  "softprimehub.store","sohu.scottor.web.id","sparkletoc.com","spidez.sbs","spoasta.me",
  "streamingku.live","sunnyblogexpress.com","svvdfeghdb.help","tako.skin","tamttts.com",
  "tastmemail.com","taymonera.de","telkomsel.web.id","tempmail247.top","termweave.life",
  "terseti.kro.kr","thoitrangquyco.vn","thxm3.pro","tip4today.com","tlcfbmt.online",
  "tmxttvmail.com","tokobibit.co","tokoriad.biz.id","trangiabao.click","trendzvibe.shopping",
  "trungtampccc.vn","tudiencongnghiep.com.vn","tuku26012023.xyz","uhshad.qelirapo.my.id",
  "ultrmigos.online","uniqueproducts.site","universitas.codes","us-pt.top",
  "vese.noobsie290.biz.id","vidco.eu.org","vilocom.vn","virginsrus.xyz","vitacimin.me",
  "voucherskuy.com","vremail.co","wangdandan-w.cc","waroengku.cc","we-ede.top","whybe.dev",
  "wiro.dergana.online","wochaojibang.sbs","wolaila.cc","wome.jemr27.christmas","xelio.sbs",
  "xmen.work","xomqirantel.site","xunapcompany.us","xxx-tower.net","yahesazo.me",
  "yang-gtens.pro","yangzhong-sfd.cc","ydah.me","yesmail.my.id","yl66.cfd",
  "ynagjie-66.cc","yqc7.mailccsequi.my.id","yujiehanjiao.cc","yuwe.kepkat.com",
  "yzrkive.cfd","zenbada.com","zenithlynow.com","zevionyx.com","zikzak.gq","zuldev.live",
  "zumy.dev"
];

// ─── TELEGRAM HELPERS ─────────────────────────────────────────────────────────
async function tg(method, body) {
  const { data } = await axios.post(`${TG}/${method}`, body);
  return data;
}

async function sendMessage(chat_id, text, extra = {}) {
  return tg("sendMessage", { chat_id, text, parse_mode: "Markdown", ...extra });
}

async function editMessage(chat_id, message_id, text, extra = {}) {
  return tg("editMessageText", { chat_id, message_id, text, parse_mode: "Markdown", ...extra }).catch(() => {});
}

async function sendDocument(chat_id, filename, content, caption = "") {
  const FormData = require("form-data");
  const form = new FormData();
  form.append("chat_id", chat_id);
  form.append("caption", caption);
  form.append("document", Buffer.from(content), { filename });
  return axios.post(`${TG}/sendDocument`, form, { headers: form.getHeaders() });
}

async function sendReaction(chat_id, message_id, emoji) {
  return tg("setMessageReaction", {
    chat_id, message_id,
    reaction: [{ type: "emoji", emoji }]
  }).catch(() => {});
}

// ─── AUTO SET WEBHOOK ─────────────────────────────────────────────────────────
async function autoSetWebhook(req) {
  try {
    const host = req.headers["x-forwarded-host"] || req.headers.host || "";
    if (!host) return;
    const webhookUrl = `https://${host}/api/webhook`;
    const { data: info } = await axios.get(`${TG}/getWebhookInfo`);
    if (info.result?.url === webhookUrl) return;
    await tg("setWebhook", { url: webhookUrl });
    console.log(`[AutoWebhook] ✅ Set ke: ${webhookUrl}`);
  } catch (e) {
    console.error("[AutoWebhook] ❌", e.message);
  }
}

// ─── WHITELIST (simpan di memory + kirim JSON ke owner) ──────────────────────
// Di Vercel serverless, state in-memory reset tiap cold start.
// User list di-persist dengan cara: owner kirim JSON-nya ke bot, bot load ulang.
// Solusi sederhana: simpan di global variable (bertahan selama instance hidup)
// dan owner bisa /reload untuk load ulang dari file yang dikirim ke bot.

let userWhitelist = new Set(); // set of telegram user_id (string)
let pendingJsonFileId = null;  // file_id JSON terakhir yang dikirim owner

function isOwner(user_id) {
  return String(user_id) === String(OWNER_ID);
}

function isAllowed(user_id) {
  if (isOwner(user_id)) return true;
  return userWhitelist.has(String(user_id));
}

// ─── THERESAV API CALLS ───────────────────────────────────────────────────────
async function theresav(path, params = {}) {
  const url = new URL(`${THERESAV}${path}`);
  url.searchParams.set("apikey", API_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const { data } = await axios.get(url.toString());
  return data;
}

// ─── /gtemp - AUTO GENERATE TEMPMAIL + ALIGHT MOTION ─────────────────────────
async function handleGtemp(msg, domain) {
  const chat_id = msg.chat.id;
  const message_id = msg.message_id;

  // Pilih domain random jika tidak disebutkan
  const chosenDomain = domain || VALID_DOMAINS[Math.floor(Math.random() * VALID_DOMAINS.length)];

  await sendReaction(chat_id, message_id, "⏳");
  const statusMsg = await sendMessage(chat_id,
    `⚙️ *Auto AM Premium Dimulai...*\n\n` +
    `📧 Domain: \`${chosenDomain}\`\n` +
    `🔄 Step 1/4: Membuat email sementara...`
  );
  const sid = statusMsg.result.message_id;

  try {
    // Step 1: Create temp email
    const createRes = await theresav("/tools/generator-email/create", { domain: chosenDomain });
    if (!createRes.status) throw new Error("Gagal buat email: " + (createRes.message || JSON.stringify(createRes)));
    const email = createRes.result.email;

    await editMessage(chat_id, sid,
      `⚙️ *Auto AM Premium Dimulai...*\n\n` +
      `📧 Email: \`${email}\`\n` +
      `🔄 Step 2/4: Mengirim request login ke Alight Motion...`
    );

    // Step 2: Send AM login request
    const sendRes = await theresav("/premium/alightmotion/send", { email });
    if (!sendRes.status) throw new Error("Gagal kirim AM: " + (sendRes.message || JSON.stringify(sendRes)));

    await editMessage(chat_id, sid,
      `⚙️ *Auto AM Premium Dimulai...*\n\n` +
      `📧 Email: \`${email}\`\n` +
      `✅ Step 2/4: Request terkirim!\n` +
      `🔄 Step 3/4: Menunggu email verifikasi masuk... _(maks 60 detik)_`
    );

    // Step 3: Poll inbox
    let foundMsg = null;
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 4000));
      const inboxRes = await theresav("/tools/generator-email/inbox", { email });
      if (inboxRes.status && inboxRes.result?.messages?.length > 0) {
        foundMsg = inboxRes.result.messages[0];
        break;
      }
    }

    if (!foundMsg) {
      await editMessage(chat_id, sid, `❌ *Timeout!* Email verifikasi tidak kunjung masuk dalam 60 detik.\n\n_Coba lagi dengan domain berbeda._`);
      return await sendReaction(chat_id, message_id, "❌");
    }

    const verifyLink = foundMsg.url || (foundMsg.urls && foundMsg.urls[0]);
    if (!verifyLink) {
      await editMessage(chat_id, sid, `❌ *Email masuk tapi link verifikasi tidak ditemukan.*\n\n_Coba domain lain._`);
      return await sendReaction(chat_id, message_id, "❌");
    }

    await editMessage(chat_id, sid,
      `⚙️ *Auto AM Premium Dimulai...*\n\n` +
      `📧 Email: \`${email}\`\n` +
      `✅ Step 3/4: Email verifikasi diterima!\n` +
      `🔄 Step 4/4: Verifikasi ke server Alight Motion...`
    );

    // Step 4: Verify
    const verifyRes = await theresav("/premium/alightmotion/verify", { email, link: verifyLink });
    if (!verifyRes.status) throw new Error("Gagal verifikasi: " + (verifyRes.message || JSON.stringify(verifyRes)));

    const rawDuration = verifyRes.data?.duration || verifyRes.data?.package_type || "";
    const durationText = rawDuration === "1_year" ? "1 Tahun" : rawDuration.replace("_", " ") || "1 Bulan";

    await editMessage(chat_id, sid,
      `🎉 *───「 ＡＬＩＧＨＴ  ＭＯＴＩＯＮ  ＰＲＥＭＩＵＭ 」───*\n\n` +
      `⚡ _${verifyRes.message || "Verifikasi akun berhasil!"}_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      ` ◦ *Email:* \`${email}\`\n` +
      ` ◦ *Domain:* \`${chosenDomain}\`\n` +
      ` ◦ *Tipe:* \`${verifyRes.data?.type || "success"}\`\n` +
      ` ◦ *Durasi:* \`${durationText}\` ⏳\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ Login ke Alight Motion menggunakan email di atas!\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Engine System by Amane Ofc_`
    );
    await sendReaction(chat_id, message_id, "✅");

  } catch (e) {
    console.error("[gtemp]", e.message);
    await editMessage(chat_id, sid, `❌ *Error:* ${e.message}`);
    await sendReaction(chat_id, message_id, "❌");
  }
}

// ─── /add handler ─────────────────────────────────────────────────────────────
async function handleAdd(msg, targetId) {
  const chat_id = msg.chat.id;

  if (!isOwner(msg.from.id)) {
    return sendMessage(chat_id, "❌ Hanya owner yang bisa menggunakan perintah ini.");
  }

  if (!targetId || isNaN(targetId)) {
    return sendMessage(chat_id, "❌ Format salah.\n\nContoh: `/add 123456789`");
  }

  userWhitelist.add(String(targetId));

  // Kirim JSON ke owner
  const listArr = Array.from(userWhitelist);
  const jsonContent = JSON.stringify({ users: listArr, updated: new Date().toISOString() }, null, 2);
  await sendDocument(
    OWNER_ID,
    "whitelist.json",
    jsonContent,
    `✅ User \`${targetId}\` berhasil ditambahkan!\n\nTotal user: ${listArr.length}`
  );

  return sendMessage(chat_id, `✅ User \`${targetId}\` berhasil ditambahkan ke whitelist!\n\nFile whitelist.json telah dikirim ke Owner.`);
}

// ─── /remove handler ─────────────────────────────────────────────────────────
async function handleRemove(msg, targetId) {
  const chat_id = msg.chat.id;

  if (!isOwner(msg.from.id)) {
    return sendMessage(chat_id, "❌ Hanya owner yang bisa menggunakan perintah ini.");
  }

  if (!targetId || isNaN(targetId)) {
    return sendMessage(chat_id, "❌ Format salah.\n\nContoh: `/remove 123456789`");
  }

  userWhitelist.delete(String(targetId));

  const listArr = Array.from(userWhitelist);
  const jsonContent = JSON.stringify({ users: listArr, updated: new Date().toISOString() }, null, 2);
  await sendDocument(
    OWNER_ID,
    "whitelist.json",
    jsonContent,
    `🗑️ User \`${targetId}\` dihapus dari whitelist.\n\nTotal user: ${listArr.length}`
  );

  return sendMessage(chat_id, `🗑️ User \`${targetId}\` berhasil dihapus dari whitelist.`);
}

// ─── Load whitelist dari JSON yang dikirim ke bot ────────────────────────────
async function handleDocument(msg) {
  const chat_id = msg.chat.id;

  if (!isOwner(msg.from?.id)) return; // hanya owner

  const doc = msg.document;
  if (!doc || !doc.file_name?.endsWith(".json")) return;

  try {
    const { data: fileInfo } = await axios.get(`${TG}/getFile?file_id=${doc.file_id}`);
    const filePath = fileInfo.result.file_path;
    const { data: fileContent } = await axios.get(
      `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`,
      { responseType: "text" }
    );

    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed.users)) {
      userWhitelist = new Set(parsed.users.map(String));
      await sendMessage(chat_id,
        `✅ *Whitelist berhasil dimuat!*\n\n` +
        `Total user terdaftar: *${userWhitelist.size}*\n` +
        `\`${Array.from(userWhitelist).join(", ") || "Kosong"}\``
      );
    } else {
      await sendMessage(chat_id, "❌ Format JSON tidak valid. Harus: `{ \"users\": [\"id1\", \"id2\"] }`");
    }
  } catch (e) {
    await sendMessage(chat_id, `❌ Gagal membaca file JSON: ${e.message}`);
  }
}

// ─── /start & /help ───────────────────────────────────────────────────────────
async function handleStart(msg) {
  const chat_id = msg.chat.id;
  const name = msg.from?.first_name || "Kak";

  await tg("sendMessage", {
    chat_id,
    text:
      `👋 Halo *${name}*! Selamat datang di *AM Premium Bot* 🎬\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Pilih menu di bawah untuk mulai:`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🚀 Auto AM Premium", callback_data: "menu_gtemp" },
          { text: "📧 Send Email AM",   callback_data: "menu_ampremium" }
        ],
        [
          { text: "✅ Verifikasi AM",   callback_data: "menu_amverify" },
          { text: "❓ Bantuan",         callback_data: "menu_help" }
        ],
        ...(isOwner(msg.from?.id) ? [[
          { text: "👑 Panel Owner",     callback_data: "menu_owner" }
        ]] : [])
      ]
    }
  });
}

async function sendHelp(chat_id, is_owner = false) {
  const ownerSection = is_owner
    ? `\n\n👑 *OWNER COMMANDS:*\n` +
      `🔹 /add \`<id>\` — Tambah user ke whitelist\n` +
      `🔹 /remove \`<id>\` — Hapus user dari whitelist\n` +
      `🔹 /listuser — Lihat semua user terdaftar\n` +
      `📎 _Kirim file whitelist.json ke bot untuk reload._`
    : "";

  await sendMessage(chat_id,
    `📋 *DAFTAR COMMAND:*\n\n` +
    `🔹 /gtemp \`[domain]\` — Auto generate email & AM Premium\n` +
    `   _Contoh: /gtemp atau /gtemp maildy.site_\n\n` +
    `🔹 /ampremium \`<email>\` — Kirim link verifikasi ke email kamu\n\n` +
    `🔹 /amverify \`<email> | <link>\` — Verifikasi setelah dapat link\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━${ownerSection}\n\n` +
    `_Engine System by Satriadevs | Codersteam_`
  );
}

// ─── CALLBACK QUERY (button menu) ────────────────────────────────────────────
async function handleCallback(cb) {
  const chat_id = cb.message.chat.id;
  const user_id = cb.from.id;
  const data    = cb.data;

  // Jawab callback agar loading spinner hilang
  await tg("answerCallbackQuery", { callback_query_id: cb.id });

  if (data === "menu_help") {
    return sendHelp(chat_id, isOwner(user_id));
  }

  if (data === "menu_owner") {
    if (!isOwner(user_id)) return sendMessage(chat_id, "❌ Bukan owner.");
    return sendMessage(chat_id,
      `👑 *PANEL OWNER*\n\n` +
      `Total user whitelist: *${userWhitelist.size}*\n\n` +
      `🔹 /add \`<id>\` — Tambah user\n` +
      `🔹 /remove \`<id>\` — Hapus user\n` +
      `🔹 /listuser — Lihat semua user\n` +
      `📎 _Kirim file whitelist.json untuk reload whitelist._`
    );
  }

  // Cek whitelist sebelum fitur utama
  if (!isAllowed(user_id)) {
    return sendMessage(chat_id,
      `🔒 *Akses Ditolak*\n\n` +
      `Kamu bukan user premium bot ini.\n` +
      `Hubungi owner untuk mendapatkan akses.`
    );
  }

  if (data === "menu_gtemp") {
    return sendMessage(chat_id,
      `🚀 *Auto AM Premium*\n\n` +
      `Kirim perintah:\n` +
      `/gtemp — pakai domain random\n` +
      `/gtemp maildy.site — pakai domain pilihan`
    );
  }

  if (data === "menu_ampremium") {
    return sendMessage(chat_id,
      `📧 *Send Email AM*\n\n` +
      `Format: /ampremium <email>\n\n` +
      `Contoh:\n/ampremium emailkamu@gmail.com`
    );
  }

  if (data === "menu_amverify") {
    return sendMessage(chat_id,
      `✅ *Verifikasi AM*\n\n` +
      `Format: /amverify <email> | <link>\n\n` +
      `Contoh:\n/amverify email@gmail.com | https://alight-creative.firebaseapp.com/...`
    );
  }
}

// ─── /ampremium ───────────────────────────────────────────────────────────────
async function handleAmPremium(msg, email) {
  const chat_id = msg.chat.id;
  const message_id = msg.message_id;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return sendMessage(chat_id, "❌ *Error:* Format email tidak valid kak!");
  }

  await sendReaction(chat_id, message_id, "⏳");

  try {
    const res = await theresav("/premium/alightmotion/send", { email: email.trim() });
    if (res && res.status === true) {
      await sendMessage(chat_id,
        `🎉 *───「 ＡＬＩＧＨＴ  ＭＯＴＩＯＮ 」───*\n` +
        `⚡ _${res.message || "Link verifikasi berhasil dikirim!"}_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        ` ◦ *Target Email:* \`${res.data?.email || email}\`\n` +
        ` ◦ *Tipe Akses:* \`${res.data?.type || "need_link"}\`\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📋 *LANGKAH AKTIVASI:*\n\n` +
        `1️⃣ Buka Gmail → cek *Folder Spam* jika tidak ada di inbox\n` +
        `2️⃣ Klik tombol *"Login"* di email dari Alight Motion\n` +
        `3️⃣ Salin/copy seluruh URL di address bar browser\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💡 _Setelah dapat link, gunakan /amverify_\n` +
        `_Engine System by Amane Ofc_`
      );
      await sendReaction(chat_id, message_id, "✅");
    } else {
      throw new Error(res?.message || "Gagal mendapat respon dari server.");
    }
  } catch (e) {
    await sendReaction(chat_id, message_id, "❌");
    await sendMessage(chat_id, `❌ *Gagal:* ${e.response?.data?.message || e.message}`);
  }
}

// ─── /amverify ────────────────────────────────────────────────────────────────
async function handleAmVerify(msg, args) {
  const chat_id = msg.chat.id;
  const message_id = msg.message_id;

  if (!args || !args.includes("|")) {
    return sendMessage(chat_id,
      `🔐 *Format Salah!*\n\nKetik: /amverify email | link\n\nContoh:\n/amverify email@gmail.com | https://alight-creative.firebaseapp.com/...`
    );
  }

  const [email, link] = args.split("|").map(v => v.trim());
  if (!email || !link) return sendMessage(chat_id, "⚠️ Email dan link harus diisi semua.");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return sendMessage(chat_id, "❌ Format email tidak valid.");

  await sendReaction(chat_id, message_id, "⏳");

  try {
    const res = await theresav("/premium/alightmotion/verify", { email, link });
    if (res && res.status === true) {
      const rawDur = res.data?.duration || "";
      const durText = rawDur === "1_year" ? "1 Tahun" : rawDur.replace("_", " ") || "—";
      await sendMessage(chat_id,
        `🎉 *───「 ＡＭ  ＶＥＲＩＦＩＣＡＴＩＯＮ 」───*\n` +
        `⚡ _${res.message || "Verifikasi akun berhasil!"}_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        ` ◦ *Email:* \`${res.data?.email || email}\`\n` +
        ` ◦ *Tipe:* \`${res.data?.type || "success"}\`\n` +
        ` ◦ *Durasi:* \`${durText}\` ⏳\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `✅ Akun kamu sudah *PRO / PREMIUM*!\n` +
        `Buka Alight Motion & login pakai email di atas.\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Engine System by Amane Ofc_`
      );
      await sendReaction(chat_id, message_id, "✅");
    } else {
      throw new Error(res?.message || "Gagal verifikasi.");
    }
  } catch (e) {
    await sendReaction(chat_id, message_id, "❌");
    await sendMessage(chat_id, `❌ *Verification Error:* ${e.response?.data?.message || e.message}`);
  }
}

// ─── ROUTER UTAMA ─────────────────────────────────────────────────────────────
async function processUpdate(update) {
  // Callback query (tombol menu)
  if (update.callback_query) return handleCallback(update.callback_query);

  const msg = update.message || update.channel_post;
  if (!msg) return;

  // Cek dokumen JSON yang dikirim owner
  if (msg.document) return handleDocument(msg);

  if (!msg.text) return;

  const text = msg.text.trim();
  const [rawCmd, ...rest] = text.split(" ");
  const cmd  = rawCmd.split("@")[0].toLowerCase();
  const args = rest.join(" ");
  const user_id = msg.from?.id;

  // Command yang tidak perlu whitelist
  if (cmd === "/start" || cmd === "/help") return handleStart(msg);

  // Cek whitelist untuk semua command lain
  if (!isAllowed(user_id)) {
    return sendMessage(msg.chat.id,
      `🔒 *Akses Ditolak*\n\n` +
      `Kamu bukan user premium bot ini.\n` +
      `Hubungi owner untuk mendapatkan akses.`
    );
  }

  // Owner-only commands
  if (cmd === "/add") return handleAdd(msg, args.trim());
  if (cmd === "/remove") return handleRemove(msg, args.trim());

  if (cmd === "/listuser") {
    if (!isOwner(user_id)) return sendMessage(msg.chat.id, "❌ Hanya owner.");
    const list = Array.from(userWhitelist);
    return sendMessage(msg.chat.id,
      `👥 *Daftar User Whitelist* (${list.length})\n\n` +
      (list.length ? list.map((id, i) => `${i + 1}. \`${id}\``).join("\n") : "_Belum ada user._")
    );
  }

  // User commands
  if (cmd === "/gtemp") return handleGtemp(msg, args.trim() || null);

  if (["/ampremium", "/sendam", "/alightpremium", "/alightmotion"].includes(cmd)) {
    if (!args) return sendMessage(msg.chat.id, `📧 *Format:* /ampremium <email>\n\nContoh:\n/ampremium emailkamu@gmail.com`);
    return handleAmPremium(msg, args);
  }

  if (["/amverify", "/alightverify", "/viam", "/verifyam"].includes(cmd)) {
    return handleAmVerify(msg, args);
  }
}

// ─── VERCEL EXPORT ────────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  if (req.method === "GET") {
    await autoSetWebhook(req);
    return res.status(200).send("AM Premium Bot is running! 🚀\nWebhook auto-configured ✅");
  }

  if (req.method === "POST") {
    autoSetWebhook(req).catch(() => {});
    try {
      await processUpdate(req.body);
    } catch (err) {
      console.error("Error:", err);
    }
    return res.status(200).json({ ok: true });
  }

  res.status(405).send("Method Not Allowed");
};
