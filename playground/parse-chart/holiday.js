const axios = require('axios');
const _ = require('lodash')

async function main() {
  const list = []
  let p = 1, maxPage
  do {
    // const formData = [{ m: 'top', ltype: 'tc', page: p }]; // 國語點播排行
    const formData = [{ m: 'top', ltype: 'et', page: p }]; // 西洋點播排行
    const resp = await axios.post('https://www.holiday.com.tw/Ashx/SongInfo.ashx', formData);
    const data = _.get(resp.data, '[0].DataList');
    const result = _.map(data, track => ({
      songname: decodeURIComponent(track.songname),
      singer: decodeURIComponent(track.singer)
    }));
    // console.dir(result, { depth: null });
    list.push(...result);
    maxPage = _.get(resp.data, '[0].Page[0].MaxPage');
  } while (++p <= maxPage);
  console.dir(list, { depth: null });
}

main().catch(err => console.log(err));
