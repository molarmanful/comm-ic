$(_=>{
  let handler = _=>{
    let panes = $('body > .full')
    let hand = $('.scaled')
    let cpane = $('.scaled').parent().clone()

    panes.first().remove()
    hand.first().removeClass('scaled').off('click')
    $('body').append(panes.slice(1, -1), cpane)
    $('.scaled').click(handler)
  }

  $('.scaled').click(handler)
})
