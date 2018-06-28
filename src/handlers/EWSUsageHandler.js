export default function getEWSUsageData(callback) {

    fetch('https://ews-proxy.herokuapp.com/https://my.engr.illinois.edu/labtrack/util_data_json.asp', {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'referer': 'https://it.engineering.illinois.edu/ews',
            'authority': 'my.engr.illinois.edu',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'
        }
    })
        .then((resp) => {
            return resp.json();
        }).catch((err) => {
            console.log(err);
        })
        .then((json) => {
            callback(json);
        });
}
