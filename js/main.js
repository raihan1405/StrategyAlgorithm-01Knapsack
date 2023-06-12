const dataRumah = [
    {
        id: 0,
        luas: 0,
        type: "0",
        harga: 0,
        img: "assets/img/rmh-9.png"
    },
    {
        id: 1,
        luas: 50,
        type: "42",
        harga: 275000000,
        img: "assets/img/rmh-1.png"

    },
    {
        id: 2,
        luas: 80,
        type: "72",
        harga: 450000000,
        img: "assets/img/rmh-2.png"

    },
    {
        id: 3,
        luas: 50,
        type: "12",
        harga: 250000000,
        img: "assets/img/rmh-3.png"

    },
    {
        id: 4,
        luas: 30,
        type: "15",
        harga: 350000000,
        img: "assets/img/rmh-4.png"

    },
    {
        id: 5,
        luas: 45,
        type: "22",
        harga: 242000000,
        img: "assets/img/rmh-10.png"

    },
    {
        id: 6,
        luas: 42,
        type: "24",
        harga: 266000000,
        img: "assets/img/rmh-11.png"

    },
    {
        id: 7,
        luas: 100,
        type: "48",
        harga: 475000000,
        img: "assets/img/rmh-12.png"

    },
    {
        id: 8,
        luas: 82,
        type: "10",
        harga: 400000000,
        img: "assets/img/rmh-13.png"

    },
]
dataRumah.forEach(rumah => {
    rumah.den = rumah.harga / rumah.luas;
});

koordinat = [{}, {}, {}, {}, {}, {}, {}, {}, {}]


// Fungsi algoritma Greedy untuk memilih rumah dengan harga tertinggi
// K adalah jumlah rumah yang ingin ditampilkan

function dynamic(items, i, j, coordinate) {
    // console.log("i = ", i, "j = ", j)
    if (i === 0 || j === 0) {
      coordinate[i][j] = 0
      return 0
    } else if (j < items[i].harga) {
      temp = dynamic(items, i-1, j, coordinate)
      coordinate[i][j] = temp
      return temp
    } else {
      // console.log("dynamic(", i-1, ",", j, "),", items[i].luas, "+ dynamic(", i-1, ",", j - items[i].harga, ")")
      if (dynamic(items, i-1, j, coordinate) < items[i].luas + dynamic(items, i-1, j-items[i].harga, coordinate)) {
        temp = items[i].luas + dynamic(items, i-1, j-items[i].harga, coordinate)
        coordinate[i][j] = temp
        return temp
      } else {
        temp = dynamic(items, i-1, j, coordinate)
        coordinate[i][j] = temp
        return temp
      }
    }
}

function pickFromDynamic(arr, coordinate, i, j, picked) {
    if (i == 0 || j == 0) {
      return 0
    }
    else if (coordinate[i][j] != coordinate[i-1][j]) {
      picked.push(arr[i])
      pickFromDynamic(arr, coordinate, i-1, j-arr[i].harga, picked)
    }
    else {
      pickFromDynamic(arr, coordinate, i-1, j, picked)
    }
}

function quickSortDensity(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    var pivot = arr[0].luas /arr[0].harga;
    var left = []; 
    var right = [];
    for (var i = 1; i < arr.length; i++) {
      arr[i].luas / arr[i].harga > pivot ? left.push(arr[i]) : right.push(arr[i]);
    }
    return quickSortDensity(left).concat(arr[0], quickSortDensity(right));
}

function greedyDensity(arr, totalWeight) {
    arr = quickSortDensity(arr)
    var pickedList = []
    var pickedWeight = 0

    for (var i = 0; i < arr.length; i++) {
      if ((pickedWeight + arr[i].harga) <= totalWeight) {
        pickedList.push(arr[i])
        pickedWeight += arr[i].harga
      }
    }
    return pickedList;
}

function selectHouseByBudgetDP(data, budget) {
    diambil = []
    if (data[0].type != 0) {
        data.unshift(    {
            id: 0,
            luas: 0,
            type: "0",
            harga: 0,
            img: "assets/img/rmh-1.png"
        })
    }

    dynamic(data, 8, budget, koordinat);

    if (diambil.length === 0) {
        pickFromDynamic(data, koordinat, 8, budget, diambil)
    }

    return diambil;
}

function selectHouseByBudgetGreedy(data, budget) {
    // Urutkan rumah berdasarkan harga dari terendah ke tertinggi

    if (data[0].type == 0) {
        data.shift()
    }

    return greedyDensity(data, budget);
}
