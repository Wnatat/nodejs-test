const router = require("express").Router();

router.get("/", (req, res) => {
    const indicators = [
        'NY.GDP.MKTP.CD',
        'DPANUSSPB',
        'AG.AGR.TRAC.NO',
        'UIS.NERA.AGM1',
    ];

    const fetchData = async () => {
        try {
            const data = await Promise.all(indicators.map(async indicator => {
                const url = 'http://api.worldbank.org/v2/country/fr/indicator/'+ indicator + '?format=json';

                const resp = await fetch(url);
                return resp.json();
            }));
            
            const chartData = data.map(dataset => {
                return {
                    'name': dataset[1][0].indicator.value,
                    'labels': dataset[1].map(row => row.date.substring(0, 4)).sort(),
                    'chartData':  dataset[1].map(row => row.value).sort(),
                    'index': () => {
                        return data.indexOf(dataset);
                    }
                };
            });

            res.render('dashboards', { 'companyName': 'walid', 'data': chartData });
        } catch(err) {
            console.log(err);
            throw Error("Promise failed");
        }
    };

    fetchData();
});

module.exports = router;