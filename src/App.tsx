import { useEffect, useState } from 'react'
import { type ipSearch } from './types/ip-search'
import './App.css'

function App() {
  const [ipInfo, setIpInfo] = useState<ipSearch>()
  const [userIP, setUserIP] = useState<string>("")

  const getUserIP = async () => {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    setUserIP(data.ip)
  }

  const handleIPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIP(event.target.value)
  }

  useEffect(() => {
    getUserIP()
  }, [])

  const getIpInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const ip = (document.getElementById('ip') as HTMLInputElement).value

    try {
      const freeIpApiResponse = await fetch(`https://freeipapi.com/api/json/${ip}`)
      
      const freeIpApiData = await freeIpApiResponse.json()
      setIpInfo({ freeIpApiData })
      
    } catch {
      console.error("No fue posible realizar la petición.")
    }
  }
  
  return (
    <>
      <h1>Buscar información de IP</h1>
      <form onSubmit={getIpInfo}>
        <input id="ip" type="text" placeholder="1.1.1.1" value={userIP} onChange={handleIPChange} />
        <button type="submit">Buscar</button>
      </form>
      
      {
        ipInfo && (
          <div className="ip-info-container">
            {
              ipInfo.freeIpApiData ? (
                <>
                  <div>
                    <h2>Información de la IP</h2>
                    <p><strong>IP:</strong> {ipInfo.freeIpApiData.ipAddress}</p>
                    <p><strong>Version de IP:</strong> {ipInfo.freeIpApiData.ipVersion}</p>
                    <p><strong>Continente:</strong> {ipInfo.freeIpApiData.continent}</p>
                    <p><strong>Código de continente:</strong> {ipInfo.freeIpApiData.continentCode}</p>
                    <p><strong>País:</strong> {ipInfo.freeIpApiData.countryName}</p>
                    <p><strong>Código de país:</strong> {ipInfo.freeIpApiData.countryCode}</p>
                    <p><strong>Región:</strong> {ipInfo.freeIpApiData.regionName}</p>
                    <p><strong>Ciudad:</strong> {ipInfo.freeIpApiData.cityName}</p>
                    <p><strong>Código postal:</strong> {ipInfo.freeIpApiData.zipCode}</p>
                    <p><strong>Latitud:</strong> {ipInfo.freeIpApiData.latitude}</p>
                    <p><strong>Longitud:</strong> {ipInfo.freeIpApiData.longitude}</p>
                    <p><strong>Zona horaria:</strong> {ipInfo.freeIpApiData.timeZone}</p>
                    {/* <p><strong>Idioma:</strong> {ipInfo.freeIpApiData.language}</p> */}
                    <p><strong>Moneda:</strong> {ipInfo.freeIpApiData.currency.name} ({ipInfo.freeIpApiData.currency.code})</p>
                    <p><strong>Proxy:</strong> {ipInfo.freeIpApiData.isProxy ? 'Sí' : 'No'}</p>
                    <p><strong>Zonas horarias:</strong> {ipInfo.freeIpApiData.timeZones.join(', ')}</p>
                    <p><strong>TLDs:</strong> {ipInfo.freeIpApiData.tlds.join(', ')}</p>
                  </div>
                  <div id="iframe-container">
                    <iframe
                      style={{ width: '100%', height: '350px' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBoFf2mJZpgwrxBNmm3ZxGPCGQKe1Tykxw
                        &q=${ipInfo.freeIpApiData.latitude},${ipInfo.freeIpApiData.longitude}`}>
                    </iframe>
                  </div>
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
