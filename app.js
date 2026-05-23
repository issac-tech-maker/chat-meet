// Preview interactivity with bottom navigation and meeting creation
document.addEventListener('DOMContentLoaded',()=>{
  const loginBtn=document.getElementById('login-button');
  const loginName=document.getElementById('login-username');
  const loginMsg=document.getElementById('login-message');
  const loginScreen=document.getElementById('login-screen');
  const dashboard=document.getElementById('dashboard-screen');
  const welcome=document.getElementById('user-welcome');
  const logout=document.getElementById('logout-button');
  const subtitle=document.getElementById('user-subtitle');
  const panels=document.querySelectorAll('.page-panel');
  const bottomButtons=document.querySelectorAll('.nav-item-bottom');

  const activeRoomName=document.getElementById('active-room-name');
  const activeRoomMembers=document.getElementById('active-room-members');
  const roomList=document.getElementById('room-list');
  const sendBtn=document.getElementById('send-chat-button');
  const chatInput=document.getElementById('chat-input');
  const chatWindow=document.getElementById('chat-messages');

  const createMeetingBtn=document.getElementById('create-meeting-button');
  const meetingTitleInput=document.getElementById('meeting-title-input');
  const activeMeetingList=document.getElementById('active-meeting-list');

  const friendSearchBtn=document.getElementById('friend-search-button');
  const friendSearchInput=document.getElementById('friend-search-input');
  const searchResults=document.getElementById('search-results');

  function showPanel(panelId){
    panels.forEach(panel=>{
      const isActive = panel.id===panelId;
      panel.classList.toggle('active-panel', isActive);
      panel.classList.toggle('hidden', !isActive);
    });
    bottomButtons.forEach(btn=>btn.classList.toggle('active-bottom', btn.dataset.panel===panelId));
    const labels = { 'chat-panel':'채팅', 'meeting-panel':'회의', 'friend-panel':'친구' };
    subtitle.textContent = `${labels[panelId]} 목록을 확인하세요.`;
  }

  bottomButtons.forEach(btn=>{
    btn.addEventListener('click',()=> showPanel(btn.dataset.panel));
  });

  loginBtn.addEventListener('click',()=>{
    const name=loginName.value.trim();
    if(!name){ loginMsg.textContent='이름을 입력해주세요.'; return }
    welcome.textContent=`안녕하세요, ${name}`;
    loginScreen.style.display='none';
    dashboard.style.display='block';
    showPanel('chat-panel');
    loginMsg.textContent='';
  });

  logout.addEventListener('click',()=>{
    dashboard.style.display='none';
    loginScreen.style.display='block';
    loginName.value='';
    chatWindow.innerHTML='';
    activeRoomName.textContent='채팅방을 선택하세요';
    activeRoomMembers.textContent='';
  });

  sendBtn.addEventListener('click',()=>{
    const v=chatInput.value.trim();
    if(!v) return;
    const p=document.createElement('div'); p.textContent=`나: ${v}`; p.style.margin='6px 0';
    chatWindow.appendChild(p);
    chatInput.value=''; chatWindow.scrollTop=chatWindow.scrollHeight;
  });

  createMeetingBtn.addEventListener('click',()=>{
    const title=meetingTitleInput.value.trim();
    if(!title){ alert('회의 제목을 입력해주세요.'); return; }
    const item=document.createElement('div');
    item.textContent = title;
    activeMeetingList.appendChild(item);
    meetingTitleInput.value='';
    showPanel('meeting-panel');
  });

  friendSearchBtn.addEventListener('click',()=>{
    const query=friendSearchInput.value.trim();
    searchResults.innerHTML = '';
    if(!query){
      const note=document.createElement('div'); note.textContent='검색어를 입력하세요.';
      searchResults.appendChild(note);
      return;
    }
    const result=document.createElement('div');
    result.textContent = `${query}님 검색 결과`; 
    searchResults.appendChild(result);
  });

  const sampleRooms=['일반 채팅','오픈 채팅','친구와 채팅'];
  sampleRooms.forEach(name=>{
    const item=document.createElement('div');
    item.textContent=name;
    item.className='room-item';
    item.addEventListener('click',()=>{
      activeRoomName.textContent = name;
      activeRoomMembers.textContent = '멤버 3명';
      chatWindow.innerHTML = '';
      showPanel('chat-panel');
    });
    roomList.appendChild(item);
  });
});
