document.addEventListener("DOMContentLoaded", event => {
    const toXiaoUrl = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationTimeTable/TRTC?$filter=StationID%20%20eq%20'G03A'%20and%20DestinationStaionID%20eq%20'G03'&$format=JSON";
    const fromXiaoUrl = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationTimeTable/TRTC?$filter=StationID%20%20eq%20'G03'%20and%20DestinationStaionID%20eq%20'G03A'&$format=JSON";
    [toXiaoUrl, fromXiaoUrl].forEach(url => {
        fetch(url, { method: "GET" })
            .then(response => {
                return response.json()
            })
            .then(res => {
                if (res[0].StationID == "G03A") {
                    fromXiaoData = res
                } else if (res[0].StationID == "G03") {
                    toXiaoData = res

                } else {
                    console.log("err")
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

})

let toXiaoData

let fromXiaoData