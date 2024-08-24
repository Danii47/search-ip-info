import { useState } from 'react'
import { type ipSearch } from './types/ip-search'
import './App.css'

function App() {
  const [ipInfo, setIpInfo] = useState<ipSearch>()

  const getIpInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const ip = (document.getElementById('ip') as HTMLInputElement).value
    const freeIpApiResponse = await fetch(`https://freeipapi.com/api/json/${ip}`)
    const ipApiResponse = await fetch(`http://ip-api.com/json/${ip}?fields=66846719`)
    const freeIpApiData = await freeIpApiResponse.json()
    const ipApiData = await ipApiResponse.json()
    setIpInfo({ freeIpApiData, ipApiData })
  }
  
  return (
    <>
      <h1>Buscar información de IP</h1>
      <form onSubmit={getIpInfo}>
        <input id="ip" type="text" placeholder="1.1.1.1" value="62.42.18.167" />
        <button type="submit">Buscar</button>
      </form>
      {
        ipInfo && (
          <div className="ip-info-container">

            {
              ipInfo.ipApiData.status === "success" ? (
                <>
                  <h2>Información de la IP</h2>
                  <p><strong>IP:</strong> {ipInfo.freeIpApiData.ipAddress}</p>
                  <p><strong>Version de IP:</strong> {ipInfo.freeIpApiData.ipVersion}</p>
                  <p><strong>Continente:</strong> {ipInfo.freeIpApiData.continent}</p>
                  <p><strong>Código de continente:</strong> {ipInfo.freeIpApiData.continentCode}</p>
                  <p><strong>País:</strong> {ipInfo.freeIpApiData.countryName}</p>
                  <p><strong>Código de país:</strong> {ipInfo.freeIpApiData.countryCode}</p>
                  <p><strong>Región:</strong> {ipInfo.freeIpApiData.regionName}</p>
                  <p><strong>Ciudad:</strong> {ipInfo.freeIpApiData.cityName}</p>
                  <p><strong>Distrito:</strong> {ipInfo.ipApiData.district || "No encontrado"}</p>
                  <p><strong>Código postal:</strong> {ipInfo.ipApiData.zip}</p>
                  <p><strong>Latitud:</strong> {ipInfo.ipApiData.lat}</p>
                  <p><strong>Longitud:</strong> {ipInfo.ipApiData.lon}</p>
                  <p><strong>Zona horaria:</strong> {ipInfo.freeIpApiData.timeZone}</p>
                  {/* <p><strong>Idioma:</strong> {ipInfo.freeIpApiData.language}</p> */}
                  <p><strong>Moneda:</strong> {ipInfo.freeIpApiData.currency.name} ({ipInfo.freeIpApiData.currency.code})</p>
                  <p><strong>Proxy:</strong> {ipInfo.freeIpApiData.isProxy ? 'Sí' : 'No'}</p>
                  <p><strong>Es móvil:</strong> {ipInfo.ipApiData.mobile ? 'Sí' : 'No'}</p>
                  <p><strong>Hosting:</strong> {ipInfo.ipApiData.hosting ? 'Sí' : 'No'}</p>
                  <p><strong>Zonas horarias:</strong> {ipInfo.freeIpApiData.timeZones.join(', ')}</p>
                  <p><strong>ISP:</strong> {ipInfo.ipApiData.isp}</p>
                  <p><strong>Organización:</strong> {ipInfo.ipApiData.org}</p>
                  <p><strong>AS:</strong> {ipInfo.ipApiData.as}</p>
                  <p><strong>Nombre AS:</strong> {ipInfo.ipApiData.asname}</p>
                  <p><strong>Reverso:</strong> {ipInfo.ipApiData.reverse}</p>
                  <p><strong>TLDs:</strong> {ipInfo.freeIpApiData.tlds.join(', ')}</p>
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
