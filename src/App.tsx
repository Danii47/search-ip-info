import { useState } from 'react'
import { type ipSearch } from './types/ip-search'
import './App.css'

function App() {
  const [ipInfo, setIpInfo] = useState<ipSearch>()

  const getIpInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const ip = (document.getElementById('ip') as HTMLInputElement).value
    const response = await fetch(`https://freeipapi.com/api/json/${ip}`)
    const data = await response.json()
    setIpInfo(data)
  }
  
  return (
    <>
      <h1>Buscar información de IP</h1>
      <form onSubmit={getIpInfo}>
        <input id="ip" type="text" placeholder="1.1.1.1" />
        <button type="submit">Buscar</button>
      </form>
      {
        ipInfo && (
          <div className="ip-info-container">

            {
              ipInfo.ipAddress ? (
                <>
                  <h2>Información de la IP</h2>
                  <p><strong>IP:</strong> {ipInfo.ipAddress}</p>
                  <p><strong>Version de IP:</strong> {ipInfo.ipVersion}</p>
                  <p><strong>Continente:</strong> {ipInfo.continent}</p>
                  <p><strong>Código de continente:</strong> {ipInfo.continentCode}</p>
                  <p><strong>País:</strong> {ipInfo.countryName}</p>
                  <p><strong>Código de país:</strong> {ipInfo.countryCode}</p>
                  <p><strong>Región:</strong> {ipInfo.regionName}</p>
                  <p><strong>Ciudad:</strong> {ipInfo.cityName}</p>
                  <p><strong>Código postal:</strong> {ipInfo.zipCode}</p>
                  <p><strong>Latitud:</strong> {ipInfo.latitude}</p>
                  <p><strong>Longitud:</strong> {ipInfo.longitude}</p>
                  <p><strong>Zona horaria:</strong> {ipInfo.timeZone}</p>
                  <p><strong>Idioma:</strong> {ipInfo.language}</p>
                  <p><strong>Moneda:</strong> {ipInfo.currency.name} ({ipInfo.currency.code})</p>
                  <p><strong>Es proxy:</strong> {ipInfo.isProxy ? 'Sí' : 'No'}</p>
                  <p><strong>Zonas horarias:</strong> {ipInfo.timeZones.join(', ')}</p>
                  <p><strong>TLDs:</strong> {ipInfo.tlds.join(', ')}</p>
                </>
              ) : (
                <strong>No se encontró información para la IP ingresada.</strong>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default App
