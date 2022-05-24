// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLogs } from "../../firebase"
export default async function handler(req, res) {
  let data
  try {
    data =  await getLogs()
    console.log('data')
    console.log(data)
   
  } catch (error) {
    res.status(200).json({ status: error})
  }
  res.status(200).json({ status: 'success', data: data})
}
