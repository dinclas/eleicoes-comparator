import { useQuery } from "@tanstack/react-query"
import axios from 'axios'

export type ComparatorProps = {
  state: {
    name: string
    initials: string,
  }
}

const fetchStateData = (stateInitials: string) => {
  return axios.get<{
    state: string,
    candidates: {
      candidate: string,
      firstTurnPercentage: number,
      secondTurnPercentage: number,
    }[]
  }>(`/api/states/${stateInitials.toLowerCase()}`).then(r => r.data)
}

export const Comparator = ({
  state
}: ComparatorProps) => {
  const { data } = useQuery(
    [`states/${state.initials.toLowerCase()}`],
    () => fetchStateData(state.initials)
  )
  return (
    <div className="bg-gray-100 border w-full border-gray-200 rounded p-2">
      <span className="font-bold text-xl uppercase">{state.name} / {state.initials}</span>
      {
        data?.candidates.sort((a, b) => a.candidate.localeCompare(b.candidate)).map(candidate => ((
          <div key={candidate.candidate}>
            <p className="font-medium">{candidate.candidate}: {candidate.secondTurnPercentage - candidate.firstTurnPercentage}%</p>
          </div>
        )))
      }
    </div>
  )
}