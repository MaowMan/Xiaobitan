document.addEventListener("DOMContentLoaded", event => {
    setInterval(function() {
        now_time = new Date()
    }, 200)
    const toXiaoUrl = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationTimeTable/TRTC?$filter=StationID%20%20eq%20'G03A'%20and%20DestinationStaionID%20eq%20'G03'&$format=JSON";
    const fromXiaoUrl = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationTimeTable/TRTC?$filter=StationID%20%20eq%20'G03'%20and%20DestinationStaionID%20eq%20'G03A'&$format=JSON";
    [toXiaoUrl, fromXiaoUrl].forEach(url => {
        fetch(url, { method: "GET" })
            .then(response => {
                return response.json()
            })
            .then(data => {
                let res, index
                if (now_time.getDay() === 0 || now_time.getDay() === 6) {
                    index = 1
                } else {
                    index = 0
                }
                res = data[index].Timetables.map(string => {
                    let iso_string_now = now_time.toISOString()
                    let final_string = iso_string_now.split("T")[0] + "T" + string.DepartureTime + ":00.000Z"
                    let DateObj = new Date(final_string)
                    return DateObj
                })
                if (data[0].StationID == "G03A") {
                    fromXiaoData = res
                } else if (data[0].StationID == "G03") {
                    toXiaoData = res

                } else {
                    console.log("err")
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(event => {
                console.log("complete")
            })
    })
})

let toXiaoData

let fromXiaoData

let now_time = new Date()

let nxt_train = null

let mainObj = new Vue({
    el: "#mainDiv",
    data: {
        options: [
            { text: "小碧潭到七張", value: 0 },
            { text: "七張到小碧潭", value: 1 }
        ],
        selected: null
    },
    methods: {
        change_selected: function() {
            console.log(this.selected)
        }
    }

})