import React, { useCallback, useEffect, useState } from 'react'
import { lotteryGameType } from 'state/types'
import LotteryDetails from 'components/LotteryHistory/LotteryDetails'
import LotterySelect from 'components/NumberBox/LotterySelect'
import Banner from 'components/Layout/Banner'
import Timer from 'components/CountdownTimer/Timer'
import LotteryList from 'components/LotteryArea/LotteryList'
import SendTorii from 'components/SendTorii'
import QueryContract from 'components/QueryContract'
import queryGraphQL, { queryLotteryRounds } from 'utils/queryGraphQL'
import { lotteryRoundsState } from 'state/lottery'
import { useRecoilState } from 'recoil'
import { useSigningClient } from 'contexts/cosmwasm'

const lottery = ({ data, a }: any) => {
  const { walletAddress } = useSigningClient()
  const [open, setOpen] = useState<boolean>(false)
  const [gameResult, setGameResult] = useState<lotteryGameType | null>(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  console.log(data.rounds)
  const [lotteryRounds, setLotteryRounds] = useRecoilState(lotteryRoundsState)
  useEffect(() => {
    // setLotteryRounds((lotteryRounds) => data.rounds.map((item) => {}))
  }, [data])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-col justify-center items-center rounded-md pt-4 w-full'>
        <Banner />
        <Timer />
      </div>
      <h1 className='text-3xl md:text-5xl bg-clip-text text-transparent font-semibold leading-tight bg-gradient-to-r from-teal-400 to-blue-500 my-2 mb-6'>
        Guess you're in luck today. <br />
        Just pick it!
      </h1>
      <LotterySelect walletAddress={walletAddress} />
      {/* <Toast success={success} error={error} /> */}
      <LotteryList />
      <SendTorii setSuccess={setSuccess} setError={setError} />
      <QueryContract />
      {/* {loading} */}
      {/* {!loading && gameResult && <LotteryDetails lotteryGame={gameResult!} />} */}
      {/* {gameResult && <LotteryDetails lotteryGame={gameResult!} />} */}
      {/* <button onClick={handleClose}>close icon</button> */}
    </div>
  )
}

export default lottery

export async function getStaticProps() {
  const query = queryLotteryRounds
  const { data } = await queryGraphQL(query)

  return {
    props: {
      data,
    },
  }
}
