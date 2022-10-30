// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Candidate = {
  seq: string;
  sqcand: string;
  n: string;
  nm: string;
  cc: string;
  nv: string;
  e: string;
  st: string;
  dvt: string;
  vap: string;
  pvap: string;
}

type ElectionsResult = {
  ele: string;
  tpabr: string;
  cdabr: string;
  carper: string;
  md: string;
  t: string;
  f: string;
  dg: string;
  hg: string;
  dt: string;
  ht: string;
  dv: string;
  tf: string;
  v: string;
  esae: string;
  mnae: string;
  s: string;
  st: string;
  pst: string;
  snt: string;
  psnt: string;
  si: string;
  psi: string;
  sni: string;
  psni: string;
  sa: string;
  psa: string;
  sna: string;
  psna: string;
  e: string;
  ea: string;
  pea: string;
  ena: string;
  pena: string;
  esi: string;
  pesi: string;
  esni: string;
  pesni: string;
  c: string;
  pc: string;
  a: string;
  pa: string;
  vscv: string;
  vnom: string;
  pvnom: string;
  vvc: string;
  pvvc: string;
  vb: string;
  pvb: string;
  tvn: string;
  ptvn: string;
  vn: string;
  pvn: string;
  vnt: string;
  pvnt: string;
  vp: string;
  pvp: string;
  vv: string;
  pvv: string;
  van: string;
  pvan: string;
  vansj: string;
  pvansj: string;
  tv: string;
  cand: Candidate[];
}

type Data = {
  state: string,
  candidates: {
    firstTurnPercentage: number,
    secondTurnPercentage: number,
  }[]
}

const TURN_ID = {
  FIRST_TURN: 'c0001-e000544',
  SECOND_TURN: 'c0001-e000545',
}

const VERSION: Record<keyof typeof TURN_ID, number> = {
  FIRST_TURN: 544,
  SECOND_TURN: 545,
}

const getStateUrl = (state: string, turn: keyof typeof TURN_ID) =>
  `https://resultados.tse.jus.br/oficial/ele2022/${VERSION[turn]}/dados-simplificados/${state}/${state}-${TURN_ID[turn]}-r.json`
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [
    firstTurnResponse,
    secondTurnResponse
  ] = await Promise.all([
    axios.get<ElectionsResult>(getStateUrl(req.query.state as string, 'FIRST_TURN')),
    axios.get<ElectionsResult>(getStateUrl(req.query.state as string, 'SECOND_TURN')),
  ])

  const candidates = secondTurnResponse.data.cand.map(candidate => candidate.nm)
  const candidatesResults = candidates.map(candidate => ({
      candidate: candidate,
      firstTurnPercentage: parseFloat(firstTurnResponse.data.cand.find(x => x.nm === candidate)?.pvap || '0'),
      secondTurnPercentage: parseFloat(secondTurnResponse.data.cand.find(x => x.nm === candidate)?.pvap || '0'),
  }))

  res.status(200).json({
    state: req.query.state as string,
    candidates: candidatesResults
  })
}