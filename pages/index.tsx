import Head from 'next/head'
import { Comparator } from '../components/Comparator'

// <3
// https://gist.github.com/henriquejensen/1032c47a44d2cddaa2ef47fc531025db
const states = [
  {
    "name": "Acre",
    "initials": "AC"
  },
  {
    "name": "Alagoas",
    "initials": "AL"
  },
  {
    "name": "Amapá",
    "initials": "AP"
  },
  {
    "name": "Amazonas",
    "initials": "AM"
  },
  {
    "name": "Bahia",
    "initials": "BA"
  },
  {
    "name": "Ceará",
    "initials": "CE"
  },
  {
    "name": "Distrito Federal",
    "initials": "DF"
  },
  {
    "name": "Espírito Santo",
    "initials": "ES"
  },
  {
    "name": "Goiás",
    "initials": "GO"
  },
  {
    "name": "Maranhão",
    "initials": "MA"
  },
  {
    "name": "Mato Grosso",
    "initials": "MT"
  },
  {
    "name": "Mato Grosso do Sul",
    "initials": "MS"
  },
  {
    "name": "Minas Gerais",
    "initials": "MG"
  },
  {
    "name": "Pará",
    "initials": "PA"
  },
  {
    "name": "Paraíba",
    "initials": "PB"
  },
  {
    "name": "Paraná",
    "initials": "PR"
  },
  {
    "name": "Pernambuco",
    "initials": "PE"
  },
  {
    "name": "Piauí",
    "initials": "PI"
  },
  {
    "name": "Rio de Janeiro",
    "initials": "RJ"
  },
  {
    "name": "Rio Grande do Norte",
    "initials": "RN"
  },
  {
    "name": "Rio Grande do Sul",
    "initials": "RS"
  },
  {
    "name": "Rondônia",
    "initials": "RO"
  },
  {
    "name": "Roraima",
    "initials": "RR"
  },
  {
    "name": "Santa Catarina",
    "initials": "SC"
  },
  {
    "name": "São Paulo",
    "initials": "SP"
  },
  {
    "name": "Sergipe",
    "initials": "SE"
  },
  {
    "name": "Tocantins",
    "initials": "TO"
  }
]

export default function Home() {
  const comparators = states.map(state => <Comparator state={state} key={state.initials} />)

  return (
    <div>
      <Head>
        <title>May god have mercy on this nation</title>
      </Head>
      <main className='flex flex-col min-h-screen w-screen bg-gray-50 p-4 space-y-2'>
        <div className='flex w-full'>
          <div className='w-full'>
            <h1 className='text-2xl font-medium'>May god have mercy on this nation</h1>
            <h2>Crescimento percentual dos candidatos entre turnos</h2>
          </div>
          <a href='https://github.com/dinclas/eleicoes-comparator'>
            <img alt='Source Code' src='https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white'/>
          </a>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
          {  comparators }
        </div>
      </main>
    </div>
  )
}
