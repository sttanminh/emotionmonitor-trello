var btnCallback = async function display(t, options) {
    // demo code that will be used to extract data
    var cardId = t.getContext().card;
    var memberId = t.getContext().member;
    var boardId = t.getContext().board;
    // const card = await fetch(`https://api.trello.com/1/cards/${cardId}?fields=name,desc&key=${apiKey}&token=${apiToken}`);
    // const member  = await fetch(`https://api.trello.com/1/members/${memberId}?key=${apiKey}&token=${apiToken}`)
    // const board = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`)
    // const card_data = await card.json();
    // const member_data = await member.json();
    // const board_data = await board.json();
    try {
        var params = cardId + "/" + memberId + "/" + boardId
        console.log(params);
        // display
        t.modal({
            title: "Emotimonitor",
            url: "https://extraordinary-paprenjak-38a4ca.netlify.app/" + params,
    
        });
    } catch (error) {
        console.error('Error fetching card data: ', error);
    }
}

//initialize the power-up
if (typeof window !== 'undefined') {
  window.TrelloPowerUp.initialize({
      'card-buttons': function (t, options) {
          return [{
              text: 'Emotimonitor',
              callback: btnCallback
          }];
      }
  });
}