import { useEffect, useState } from 'react'
import { type IpApi } from './types/ip-search'
import './App.css'

function App() {
  const [ipInfo, setIpInfo] = useState<IpApi>()
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
      const ipApiResponse = await fetch(`https://ipapi.co/${ip}/json`)
      
      const ipApiData = await ipApiResponse.json()
      setIpInfo(ipApiData)
      
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
              ipInfo ? (
                <>
                  <div>
                    <h2>Información de la IP</h2>
                    <p><strong>IP:</strong> {ipInfo.ip}</p>
                    <p><strong>Red de la IP:</strong> {ipInfo.network}</p>
                    <p><strong>Version de IP:</strong> {ipInfo.version}</p>
                    {/* <p><strong>Continente:</strong> {ipInfo.continent}</p> */}
                    <p><strong>Código de continente:</strong> {ipInfo.continent_code}</p>
                    <p><strong>País:</strong> {ipInfo.country} ({ipInfo.country_code})</p>
                    <p><strong>Región:</strong> {ipInfo.region} ({ipInfo.region_code})</p>
                    <p><strong>Ciudad:</strong> {ipInfo.city}</p>
                    <p><strong>Código postal:</strong> {ipInfo.postal}</p>
                    <p><strong>Latitud:</strong> {ipInfo.latitude}</p>
                    <p><strong>Longitud:</strong> {ipInfo.longitude}</p>
                    <p><strong>Zona horaria:</strong> {ipInfo.timezone}</p>
                    <p><strong>UTC:</strong> {ipInfo.utc_offset}</p>
                    <p><strong>Está en la UE:</strong> {ipInfo.in_eu ? 'Sí' : 'No'}</p>
                    <p><strong>ISP:</strong> {ipInfo.org}</p>
                    <p><strong>ASN:</strong> {ipInfo.asn}</p>
                    <p><strong>Idioma:</strong> {ipInfo.languages}</p>
                    <p><strong>Moneda:</strong> {ipInfo.currency_name} ({ipInfo.currency})</p>
                    <p><strong>TLD:</strong> {ipInfo.country_tld}</p>
                    <p><strong>Código de llamada:</strong> {ipInfo.country_calling_code}</p>
                    <p><strong>Área del país:</strong> {ipInfo.country_area} km²</p>
                    <p><strong>Población del país:</strong> {ipInfo.country_population}</p>
                  </div>
                  <div id="iframe-container">
                    <iframe
                      style={{ width: '100%', height: '350px' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBoFf2mJZpgwrxBNmm3ZxGPCGQKe1Tykxw
                        &q=${ipInfo.latitude},${ipInfo.longitude}`}>
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
