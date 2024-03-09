function toggleText(button) {
  // 获取隐藏文本元素
  var hiddenText = document.getElementById(button.getAttribute('data-target'));

  // 切换文本的显示状态
  if (hiddenText.classList.contains('hidden')) {
    hiddenText.classList.remove('hidden');
    hiddenText.classList.add('show');
    button.textContent = 'Hide translation';
  } else {
    hiddenText.classList.remove('show');
    hiddenText.classList.add('hidden');
    button.textContent = 'Show translation';
  }
}
