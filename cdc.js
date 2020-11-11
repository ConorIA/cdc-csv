(function() {
  var t = ["Date", "Sent Amount", "Sent Currency", "Received Amount",
    "Received Currency", "Fee Amount", "Fee Currency", "Net Worth Amount",
    "Net Worth Currency", "Label", "Description", "TxHash"
  ].join(",");
  var date = new Date();
  var dateStr = date.getFullYear() + "-" + ("00" + (date.getMonth() + 1))
    .slice(-2) + "-" + ("00" + date.getDate()).slice(-2) + " " + ("00" + date
      .getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) +
    ":" + ("00" + date.getSeconds()).slice(-2);

  // Withdrawals
  $.ajax({
    url: "https://crypto.com/fe-ex-api/record/withdraw_list",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    },
    data: JSON.stringify({
      "uaTime": dateStr,
      "securityInfo": "{\"timestamp\":\"" + dateStr +
        "\",\"meta\":{}}",
      "pageSize": 200,
      "page": 1,
      "coinSymbol": null
    })
  }).then(function(e) {
    if (e.data) {
      e.data.financeList.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.updateAtTime)).toISOString(),
          e.amount, e.symbol, "", "", e.fee, e.symbol, "", "", "",
          "Withdrawal to " + e.addressTo + " (" + e.status_text +
          ")", e.txid
        ].join(",");
      });
    }
  });

  // Deposits
  $.ajax({
    url: "https://crypto.com/fe-ex-api/record/deposit_list",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    },
    data: JSON.stringify({
      "uaTime": dateStr,
      "securityInfo": "{\"timestamp\":\"" + dateStr +
        "\",\"meta\":{}}",
      "pageSize": 200,
      "page": 1,
      "coinSymbol": null
    })
  }).then(function(e) {
    if (e.data) {
      e.data.financeList.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.updateAtTime)).toISOString(),
          "", "", e.amount, e.symbol, "", "", "", "", "",
          "Deposit from " + e.addressTo + " (" + e.status_text +
          ")", e.txid
        ].join(",");
      });
    }
  });

  // CRO Staking
  $.ajax({
    url: "https://crypto.com/fe-ex-api/record/staking_interest_history",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    },
    data: JSON.stringify({
      "uaTime": dateStr,
      "securityInfo": "{\"timestamp\":\"" + dateStr +
        "\",\"meta\":{}}",
      "pageSize": 200,
      "page": 1
    })
  }).then(function(e) {
    if (e.data) {
      e.data.historyList.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.createdAtTime))
        .toISOString(), "", "", e.interestAmount, e.coinSymbol, "",
          "", "", "", "Reward", "Interest on " + e.stakeAmount +
          " at " + e.apr * 100 + "% APR (" + e.status_text + ")", ""
        ].join(",");
      });
    }
  });

  // Soft Staking
  $.ajax({
    url: "https://crypto.com/fe-ex-api/record/soft_staking_interest_list",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    },
    data: JSON.stringify({
      "uaTime": dateStr,
      "securityInfo": "{\"timestamp\":\"" + dateStr +
        "\",\"meta\":{}}",
      "pageSize": 200,
      "page": 1
    })
  }).then(function(e) {
    if (e.data) {
      e.data.softStakingInterestList.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.mtime)).toISOString(), "",
          "", e.amount, e.coinSymbol, "", "", "", "", "Reward",
          "Interest on " + e.principal + " " + e.coinSymbol +
          " at " + e.apr * 100 + "% APR", ""
        ].join(",");
      });
    }
  });

  // Rebates
  $.ajax({
    url: "https://crypto.com/fe-ex-api/record/rebate_trading_fee_history",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    },
    data: JSON.stringify({
      "uaTime": dateStr,
      "securityInfo": "{\"timestamp\":\"" + dateStr +
        "\",\"meta\":{}}",
      "pageSize": 200,
      "page": 1
    })
  }).then(function(e) {
    if (e.data) {
      e.data.historyList.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.createdAtTime))
        .toISOString(), "", "", e.rebateAmount, e.coinSymbol, "",
          "", "", "", "Reward", "Rebate on " + e.feePaid + " " + e
          .coinSymbol + " at " + e.rebatePercentage * 100 + "%", ""
        ].join(",");
      });
    }
  });

  // Syndicates
  $.ajax({
    url: "https://crypto.com/fe-ex-api/syndicate/user/activities?isCompleted=true&page=1&pageSize=10",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    }
  }).then(function(e) {
    if (e.data) {
      e.data.activities.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.userModifyTime))
          .toISOString(), e.committedCRO - e.refundedCRO, "CRO", e
          .allocatedVolume, e.syndicateCoin, "", "", "", "",
          "Syndicate", e.syndicateCoin + " syndicate at " + e
          .discountRate * 100 + "% off (" + e.discountedPrice +
          "CRO)", ""
        ].join(",");
      });
    }
  });

  // Supercharger Rewards
  $.ajax({
    url: "https://crypto.com/fe-ex-api/record/supercharger_reward_history",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: {
      "exchange-token": document.cookie.match(/token=([0-9a-zA-Z]+)/)[1]
    },
    data: JSON.stringify({
      "uaTime": dateStr,
      "securityInfo": "{\"timestamp\":\"" + dateStr +
        "\",\"meta\":{}}",
      "pageSize": 200,
      "page": 1
    })
  }).then(function(e) {
    if (e.data) {
      e.data.historyList.forEach(function(e) {
        t += "\n" + [new Date(parseInt(e.createdAt)).toISOString(),
          "", "", e.rewardAmount, e.coinSymbol, "", "", "", "",
          "Reward", e.coinSymbol + " Supercharger reward", ""
        ].join(",");
      });
    }
  });

  // Remove transfers to/from the app
  t = t.replace(/^.*Crypto.com\sApp.*($|\n)/gm, "");

  // Download the CSV
  let o = encodeURI("data:text/csv;charset=utf-8," + t),
    link = document.createElement("a");
  link.setAttribute("href", o), link.setAttribute("download",
      "crypto_exchange_data.csv"), document.body.appendChild(link), link
    .click();
})();