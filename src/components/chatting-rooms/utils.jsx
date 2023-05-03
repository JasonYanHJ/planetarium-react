function scrollToBottom(behavior = 'smooth') {
  setTimeout(() => {
    const ctx = document.getElementById("chatting-context");
    ctx.scroll({ top: ctx.scrollHeight, behavior });
  }, 0);
}

export { scrollToBottom }