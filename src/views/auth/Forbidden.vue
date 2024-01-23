 <template>
    <div class="forbidden-container">
      <h1 class="forbidden-title">403</h1>
      <p class="forbidden-message">Bạn không có quyền truy cập trang web này.</p>
      <RouterLink :to="{ path: '/' }"
                            class="btn btn-primary"
                            rel="tooltip"
                            title="Designed and Coded by Creative Tim"
                            data-placement="bottom"
                          
                          >
                          Quay lại trang chủ
                          </RouterLink>
    </div>
  </template>
  
  <style>
  .forbidden-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  
  .forbidden-title {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .forbidden-message {
    font-size: 24px;
    margin-bottom: 16px;
  }
  </style>
  