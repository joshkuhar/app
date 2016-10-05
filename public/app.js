var MOCK_HISTORY = {
    "History": [
        {
            "id": "1111111",
            "Username": "Bill",
            "Age": "25",
            "Item": {
                "Item": "Drinks",
                "Price": "10"
            }
        },
        {
            "id": "2222222",
            "Username": "John",
            "Age": "30",
            "Item": {
                "Item": "Hat",
                "Price": "12"
            }
        },
        {
            "id": "333333",
            "Username": "Lisa",
            "Age": "35",
            "Item": {
                "Item": "T.V.",
                "Price": "400"
            }
        },
        {
            "id": "4444444",
            "Username": "Tom",
            "Age": "40",
            "Item": {
                "Item": "Bike",
                "Price": "200"
            }
        }
    ]
};

var getItem = MOCK_HISTORY.History[0].Item;

$('input').click(function(){
    console.log(getItem);
    $("#item").text(getItem.Item);
    $("#price").text(getItem.Price);
});