import React from 'react'
import { tesloApi } from '../../../api/teslo.api';

const RequestInfo = () => {

  const [Info, setInfo] = React.useState<unknown>();

  React.useEffect(() => {

    tesloApi.get('/auth/private')
      .then(response => setInfo(response.data))
      .catch(() => setInfo('Error'))

  }, [])

  return (
    <>
      <h2>Informacion</h2>
      <pre>
        {JSON.stringify(Info, null, 2)}
      </pre>
    </>
  )
}

export default RequestInfo