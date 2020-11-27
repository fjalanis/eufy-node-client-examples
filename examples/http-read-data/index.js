const dotenv = require('dotenv');
const { HttpService } = require('eufy-node-client');

dotenv.config();
const USRNAME = process.env.USRNAME || 'YOUR_USERNAME';
const PASSWRD = process.env.PASSWRD || 'YOUR_PASSWORD';
console.log("usr", USRNAME)
if (!USRNAME || !PASSWRD) {
  throw new Error(`Please fill in 'USERNAME' & 'PASSWORD' values in your .env-file!`);
}

const main = async () => {
  const httpService = new HttpService(USRNAME, PASSWRD);

  const hubs = await httpService.listHubs();
  console.log('P2P_DID', hubs[0].p2p_did);
  console.log('ACTOR_ID', hubs[0].member.action_user_id);

  const stationSn = hubs[0].station_sn;
  console.log('STATION_SN', stationSn);

  const dsk = await httpService.stationDskKeys(stationSn);
  console.log('DSK_KEY', dsk.dsk_keys[0].dsk_key);
};

main();
