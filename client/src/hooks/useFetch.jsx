const { useState, useEffect } = require("react")

export const useFetch = (url, options) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const query = await fetch(url, options)
        const data = await query.json()
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData()
  }, [url, options])
}