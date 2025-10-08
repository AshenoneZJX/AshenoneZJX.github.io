<template>
  <div>
    <!-- 遮罩层 -->
    <div class="zhezhao" id="zhezhao">
      <span class="close">
        <svg t="1649229755294" class="icon" viewBox="0 0 1024 1024" version="1.1"
          p-id="4692" width="32" height="32">
          <path
            d="M512 0C229.187368 0 0 229.187368 0 512 0 794.812632 229.187368 1024 512 1024 794.812632 1024 1024 794.812632 1024 512 1024 229.187368 794.812632 0 512 0ZM512 970.105263C259.368421 970.105263 53.894737 764.631579 53.894737 512 53.894737 259.368421 259.368421 53.894737 512 53.894737 764.631579 53.894737 970.105263 259.368421 970.105263 512 970.105263 764.631579 764.631579 970.105263 512 970.105263ZM550.130526 512 719.629474 342.366316C730.273684 331.856842 730.273684 314.88 719.629474 304.370526 709.12 293.726316 692.143158 293.726316 681.633684 304.370526L512 473.869474 342.366316 304.370526C331.856842 293.726316 314.88 293.726316 304.370526 304.370526 293.726316 314.88 293.726316 331.856842 304.370526 342.366316L473.869474 512 304.370526 681.633684C293.726316 692.143158 293.726316 709.12 304.370526 719.629474 309.625263 724.884211 316.496842 727.578947 323.368421 727.578947 330.24 727.578947 337.111579 724.884211 342.366316 719.629474L512 550.130526 681.633684 719.629474C686.888421 724.884211 693.76 727.578947 700.631579 727.578947 707.503158 727.578947 714.374737 724.884211 719.629474 719.629474 730.273684 709.12 730.273684 692.143158 719.629474 681.633684L550.130526 512Z"
            p-id="4693"></path>
        </svg>
      </span>
      <div id="videoResume">
        <video id="videoResumeC" controls="" name="media">
          <source src="http://123.56.144.92/hualang/WhyDon'tWe.mp4" type="video/mp4">
        </video>
      </div> 
    </div>

    <!-- 主要页面 -->
    <div class="box">

      <!-- 顶部栏 -->
      <div class="header borderafter">
        <!-- 返回按钮 -->
        <a style="position: absolute;left:50px;" href="javascript:history.back()">
          <svg t="1649246285004" class="icon" viewBox="0 0 1024 1024" version="1.1" 
            p-id="3737" width="20" height="20">
            
            <!-- 返回按钮绘制 -->
            <path
              d="M98 468.9l322.8-322.8v184.4C743.6 376.7 881.9 607.3 928 837.8 812.7 676.4 651.3 602.6 420.8 602.6v189.1L98 468.9z"
              p-id="3738" fill="#254665"></path>
          </svg>
        </a>


        <div class="col">
          <span>ASHENONE's Blog</span>
          
          <!-- 右边操作栏 -->
          <div class="header-right">
            <!-- 按钮 -->
            <div class="min_menu-wrap" id="minmenu">
              <span class="min_menu"></span>
            </div>
            <!-- 列表 -->
            <div class="menu_list">
              <!-- 栏目 -->
              <ul class="header-nav">
                <li class="active"><a href="./index.html">主页</a></li>
                <li><a href="./mycar.html">汽车</a></li>
                <li><a href="./notes.html">记录</a></li>
              </ul>

              <!-- 明亮模式与黑暗模式切换 -->
              <span class="kaig-bottm">
                <svg t="1649159647627" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  p-id="2250" width="15" height="15">
                  <path
                    d="M1008.535135 710.670332l-70.446388 116.386904a112.099975 112.099975 0 0 1-140.572857 43.829042l-69.422645-17.083729c-5.502624 3.1992-11.133217 6.3984-16.763809 9.341665l-18.299425 62.896276C687.335435 981.514621 639.4754 1023.744064 582.657604 1023.744064H441.764828c-56.817796 0-104.677831-42.293427-110.308423-97.703574l-18.299425-62.896276a422.166458 422.166458 0 0 1-16.827793-9.341665l-69.614597 17.083729a112.163959 112.163959 0 0 1-140.508873-43.893026L15.631361 710.542364a107.493127 107.493127 0 0 1 32.43989-144.731817L96.251206 518.910272a410.649338 410.649338 0 0 1 0-14.204448l-48.179955-46.836291a107.365159 107.365159 0 0 1-32.375906-144.731817l70.190452-116.450888a112.099975 112.099975 0 0 1 140.572857-43.893026l69.550612 17.083729c5.566608-3.1992 11.133217-6.3984 16.827794-9.341665l18.299425-62.896276C336.831061 42.229443 384.691096 0 441.508892 0H582.529636c56.817796 0 104.677831 42.293427 110.372407 97.63959l18.235441 62.704324c5.75856 3.007248 11.325169 6.142464 16.827793 9.341665l69.678581-17.083729a112.163959 112.163959 0 0 1 140.508873 43.893026l70.446388 116.514872a107.493127 107.493127 0 0 1-32.375906 144.731817l-48.179955 46.772307a414.616346 414.616346 0 0 1 0 14.204448l48.243939 46.836291c47.092227 31.928018 62.192452 94.952262 32.247938 145.115721z m-213.066733-142.23644l3.391152-31.032242a246.210447 246.210447 0 0 0 0-51.699076l-3.263184-30.904274 93.992502-91.305173-53.554612-88.553862-131.615096 32.311922-23.546113-16.059985a294.134466 294.134466 0 0 0-48.627844-26.809297l-27.513121-11.901025L568.453156 127.968008H455.649356L419.370426 252.736816l-27.705074 11.965009c-16.635841 7.166208-32.951762 16.187953-48.499875 26.745313l-23.610097 15.996001-131.487128-32.247938-53.36266 88.489878 94.056486 91.433141-3.263184 30.968258a247.874031 247.874031 0 0 0 0 51.699076l3.1992 30.904274-93.928518 91.369157 53.554612 88.489878 131.551112-32.311922 23.610097 16.059985c15.292177 10.429393 31.544114 19.451137 48.563859 26.809297l27.577106 11.965009L455.905292 895.776056h112.611848l36.342914-124.768808 27.64109-11.965009c16.699825-7.166208 32.951762-16.187953 48.563859-26.745313l23.546113-15.996001 131.423144 32.247938 53.68258-88.745814-94.184454-91.369157zM512.147232 615.846038c57.329668 0 103.846038-46.516371 103.974006-103.974006 0-57.329668-46.644339-103.974006-103.974006-103.974007S408.173225 454.542364 408.173225 511.872032 454.817564 615.846038 512.147232 615.846038z m0 127.968008c-127.968008 0-231.942014-103.910022-231.942015-231.942014 0-127.968008 103.910022-231.942014 231.942015-231.942015 127.968008 0 231.942014 103.910022 231.942014 232.133967A232.133967 232.133967 0 0 1 512.147232 743.814046z"
                    p-id="2251"></path>
                </svg>

                <!-- 开关按钮 -->
                <span class="my-radio active" id="myRadio">
                  <i></i>
                </span>
                <svg t="1649159678284" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  p-id="3376" width="15" height="15">
                  <path
                    d="M505.4 878.6c-196.7 0-358-150.9-374.9-343.1 1-18.6 16.1-33.4 34.9-33.4 10.8 0 20.5 4.8 26.9 12.4 0.2 0.3 0.5 0.1 0.5-0.7 41.6 44.2 100.5 71.9 166.1 71.9 127.1 0 230.1-103 230.1-230.1 0-66.1-28-125.1-72.6-166.8 0.1-0.1 0.5-0.1 0.3-0.3-7-6.5-11.4-15.7-11.4-26.1 0-19 14.9-34.1 33.7-35.3 192.1 17.1 342.9 178.3 342.9 375 0 208-168.5 376.5-376.5 376.5z"
                    p-id="3377"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 顶部导航 -->
      <div class="navigation">
        <div class="nav-titleBox co zz">
          <!-- 占位符 -->
          <div class="co-left"></div>

          <!-- 标题 -->
          <div class="co-right ">
            <span class="titleBox-tag">HI MY NEW FRIEND!</span>
            <h1>
              Hello<br>
              I`m ASHENONE
            </h1>
            <!-- <a class="buttom navbtn" href="#next-one">了解一下
            </a> -->
          </div>
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="container content zz">

        <!-- 占位符 -->
        <div class="co-left">
          
          <!-- 简历吸盘 -->
          <div class="me-card carbox borderbefore" id="mycard">
            <div class="mecar-title">
              <div class="me-image">
                 <img src="../assets/img/toux.jpg" alt="">
              </div>
              <h3>ASHENONE</h3>
              <p class="me-hover">
                <span>我是AshenOne</span>
              </p>
            </div>
            <div class="borderbotm"></div>
            <div class="buttom-box ">
              <a class="button">联系我</a>
            </div>
          </div>
        </div>
        
        <!-- 右边 -->
        <div class="co-right" id="next-one">
          <!-- 完成项目 -->
          <div class="content-li li1">
            <div class="li1-box borderbefore">
              <span>15</span><span class="tag">+</span>
              <div class="borderbotm"></div>
              <p>展示内容1</p>
            </div>
            <div class="li1-box borderbefore">
              <span>3</span><span class="tag">+</span>
              <div class="borderbotm"></div>
              <p>展示内容2</p>
            </div>
            <div class="li1-box borderbefore">
              <span>5</span><span class="tag">+</span>
              <div class="borderbotm"></div>
              <p>展示内容3</p>
            </div>
          </div>
          <!-- 我的故事 -->
          <div class="content-li li2">
            <h3>
              <span>我的故事</span>
              <div class="borderbotm"></div>
              <span>01</span>
            </h3>
            <div class="carbox li2-box">
              <blockquote>
                <p>世界上只有一种真正的英雄主义：那就是在认清生活的真相之后依然热爱生活。</p>
                <p>Il n'ya qu'un héroïsme au monde: c'est de voir le monde tel qu'il est et de l'aimer.</p>
              </blockquote>
            </div>
          </div>
          
          <!-- 我的能力 -->
          <div class="content-li li4">
            <h3>
              <span>我的能力</span>
              <div class="borderbotm"></div>
              <span>02</span>
            </h3>
            <div class="li4-box">
              <div class="carbox">
                <svg t="1649230330671" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  p-id="1638" width="40" height="40">
                  <path
                    d="M488.96 506.88h40.96v307.2h-40.96zM803.84 737.28h-97.28c-45.056 0-81.92-36.864-81.92-81.92V502.272h40.96V655.36c0 22.528 18.432 40.96 40.96 40.96h97.28v40.96zM312.32 737.28H215.04v-40.96h97.28c22.528 0 40.96-18.432 40.96-40.96V502.272h40.96V655.36c0 45.056-36.864 81.92-81.92 81.92z"
                    fill="#254665" p-id="1639"></path>
                  <path
                    d="M509.44 942.08c-46.592 0-84.48-37.888-84.48-84.48S462.848 773.12 509.44 773.12s84.48 37.888 84.48 84.48-37.888 84.48-84.48 84.48z m0-128c-24.064 0-43.52 19.456-43.52 43.52s19.456 43.52 43.52 43.52 43.52-19.456 43.52-43.52-19.456-43.52-43.52-43.52zM171.52 798.72c-46.592 0-84.48-37.888-84.48-84.48S124.928 629.76 171.52 629.76 256 667.648 256 714.24 218.112 798.72 171.52 798.72z m0-128c-24.064 0-43.52 19.456-43.52 43.52s19.456 43.52 43.52 43.52 43.52-19.456 43.52-43.52-19.456-43.52-43.52-43.52zM847.36 798.72c-46.592 0-84.48-37.888-84.48-84.48s37.888-84.48 84.48-84.48 84.48 37.888 84.48 84.48-37.888 84.48-84.48 84.48z m0-128c-24.064 0-43.52 19.456-43.52 43.52s19.456 43.52 43.52 43.52 43.52-19.456 43.52-43.52-19.456-43.52-43.52-43.52z"
                    fill="#254665" p-id="1640"></path>
                  <path
                    d="M683.52 543.232H319.488c-90.112 0-163.328-73.216-163.328-163.328 0-90.112 73.216-163.328 163.328-163.328h7.68C344.064 138.752 413.696 81.92 495.616 81.92c69.632 0 132.608 42.496 159.232 105.472 9.728-1.536 19.456-2.56 29.184-2.56 98.816 0 179.2 80.384 179.2 179.2-0.512 98.816-80.896 179.2-179.712 179.2zM319.488 258.048c-67.584 0-122.368 54.784-122.368 122.368s54.784 122.368 122.368 122.368h364.544c76.288 0 138.24-61.952 138.24-138.24s-61.952-138.24-138.24-138.24c-12.288 0-24.576 1.536-36.864 5.12l-19.456 5.12-5.632-18.944C605.696 161.792 553.472 122.88 495.616 122.88c-68.096 0-124.416 51.2-131.584 118.784l-2.048 22.016-21.504-3.584c-7.168-1.536-14.336-2.048-20.992-2.048z"
                    fill="#254665" p-id="1641"></path>
                  <path
                    d="M655.36 640H307.2V424.96c0-33.792 27.648-61.44 61.44-61.44h348.16v215.04c0 33.792-27.648 61.44-61.44 61.44z"
                    fill="#254665" opacity=".18" p-id="1642"></path>
                </svg>
                <h4>UI设计</h4>
                <p>
                  UI排版<br>
                  响应式页面<br>
                  静态页面、动画效果<br>
                </p>
                <a>ORDER NOW</a>
              </div>
              <div class="carbox">
                <svg t="1649230368898" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  p-id="1847" width="40" height="40">
                  <path
                    d="M153.6 460.8h-40.96V179.2c0-45.056 34.816-81.92 78.336-81.92H921.6v230.4h-40.96V138.24H190.976c-20.48 0-37.376 18.432-37.376 40.96v281.6zM843.776 783.36H112.64v-216.064h40.96V742.4h690.176c20.48 0 37.376-18.432 37.376-40.96v-141.824h40.96V701.44c-0.512 45.056-35.328 81.92-78.336 81.92zM220.16 885.76h593.92v40.96H220.16z"
                    fill="#333333" p-id="1848"></path>
                  <path
                    d="M418.304 388.096l17.408 83.968 27.648-83.968H481.28l24.576 82.432 16.384-82.432h36.864l-27.648 130.048h-39.424L470.528 455.68 450.56 518.144h-39.424l-29.696-130.048h36.864zM611.328 388.096l17.408 83.968 27.648-83.968h17.92l24.576 82.432 16.384-82.432h36.864l-27.648 130.048h-39.424L663.552 455.68l-19.968 62.464H604.16l-29.696-130.048h36.864zM804.352 388.096l17.408 83.968 27.648-83.968h17.92l24.576 82.432 16.384-82.432h36.864l-27.648 130.048h-39.424L856.576 455.68l-19.968 62.464h-39.424l-29.696-130.048h36.864z"
                    fill="#EB4446" p-id="1849"></path>
                  <path
                    d="M839.168 445.44h-512V179.2c0-33.792 27.648-61.44 61.44-61.44h512v266.24c0 33.792-27.648 61.44-61.44 61.44z"
                    fill="#333333" opacity=".18" p-id="1850"></path>
                  <path d="M496.64 762.88h40.96v143.36h-40.96z" fill="#333333" p-id="1851"></path>
                </svg>
                <h4>网页制作</h4>
                <p>
                  HTML、JS、css、scss<br>
                  JS交互<br>
                  AJAX数据渲染<br>
                </p>
                <a>ORDER NOW</a>
              </div>
              <div class="carbox">
                <svg t="1649230380175" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  p-id="2002" width="40" height="40">
                  <path
                    d="M738.304 689.664h-59.392v-40.96h59.392c89.6 0 162.816-74.24 162.816-164.864 0-91.136-73.216-164.864-162.816-164.864-9.216 0-18.944 1.024-28.16 2.56l-21.504 3.584-2.048-22.016C677.376 211.968 602.112 143.36 512 143.36c-90.624 0-165.888 68.608-175.104 159.744l-2.048 22.016-21.504-3.584c-9.216-1.536-18.432-2.56-28.16-2.56-89.6 0-162.816 74.24-162.816 164.864 0 91.136 73.216 164.864 162.816 164.864h59.904v40.96H285.184c-112.128 0-203.776-92.672-203.776-205.824s91.136-205.824 203.776-205.824c4.608 0 9.728 0 14.336 0.512C319.488 176.64 407.04 102.4 511.488 102.4c104.96 0 192.512 74.24 212.48 175.616 4.608-0.512 9.216-0.512 14.336-0.512 112.128 0 203.776 92.672 203.776 205.824s-91.136 206.336-203.776 206.336z"
                    fill="#333333" p-id="2003"></path>
                  <path d="M574.464 679.936L512 617.984l-62.464 61.952-28.672-28.672 91.136-91.648 91.136 91.648z"
                    fill="#EB4446" p-id="2004"></path>
                  <path d="M491.52 614.4h40.96v171.52h-40.96z" fill="#EB4446" p-id="2005"></path>
                  <path
                    d="M512 928.768c-3.584 0-7.68-1.024-10.752-3.072l-187.392-119.296c-6.144-3.584-9.728-10.24-9.728-17.408v-239.104c0-7.168 3.584-13.312 9.728-17.408l187.392-119.296c6.656-4.096 15.36-4.096 22.016 0l187.392 119.296c6.144 3.584 9.728 10.24 9.728 17.408V788.48c0 7.168-3.584 13.312-9.728 17.408l-187.392 119.296c-3.584 2.56-7.68 3.584-11.264 3.584z m-166.912-151.552l166.912 106.496 166.912-106.496v-216.576L512 454.656l-166.912 106.496v216.064z m354.304 11.264z"
                    fill="#333333" p-id="2006"></path>
                  <path
                    d="M675.84 675.84H286.72V409.6c0-33.792 27.648-61.44 61.44-61.44h389.12v266.24c0 33.792-27.648 61.44-61.44 61.44z"
                    fill="#333333" opacity=".18" p-id="2007"></path>
                </svg>
                <h4>前端</h4>
                <p>
                  vue框架<br>
                  UI框架<br>
                  uniapp小程序
                </p>
                <a>ORDER NOW</a>
              </div>
              <div class="carbox">
                <svg t="1649230391217" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  p-id="2160" width="40" height="40">
                  <path
                    d="M512 942.08c-99.328 0-174.08-184.832-174.08-430.08s74.752-430.08 174.08-430.08 174.08 184.832 174.08 430.08-74.752 430.08-174.08 430.08z m0-819.2c-62.976 0-133.12 159.744-133.12 389.12s70.144 389.12 133.12 389.12 133.12-159.744 133.12-389.12-70.144-389.12-133.12-389.12z"
                    fill="#333333" p-id="2161"></path>
                  <path d="M102.4 491.52h814.592v40.96H102.4z" fill="#EB4446" p-id="2162"></path>
                  <path
                    d="M512 942.08c-85.504 0-167.936-25.088-239.104-72.192l22.528-33.792C359.936 878.592 434.688 901.12 512 901.12c214.528 0 389.12-174.592 389.12-389.12s-174.592-389.12-389.12-389.12-389.12 174.592-389.12 389.12c0 82.944 25.6 161.792 74.24 228.864l-33.28 24.064C110.08 691.2 81.92 603.648 81.92 512c0-237.056 193.024-430.08 430.08-430.08s430.08 193.024 430.08 430.08-193.024 430.08-430.08 430.08z"
                    fill="#333333" p-id="2163"></path>
                  <path
                    d="M860.16 793.6H419.84V496.64c0-33.792 27.648-61.44 61.44-61.44h440.32v296.96c0 33.792-27.648 61.44-61.44 61.44z"
                    fill="#333333" opacity=".18" p-id="2164"></path>
                </svg>
                <h4>后端</h4>
                <p>
                  nodjes+express+mysql<br>
                  koa<br>
                  socket<br>
                </p>
                <a>ORDER NOW</a>
              </div>
            </div>
          </div>
          <div class="borderbotm"></div>
          <!-- 底部 -->
          <div class="carbox copybottm">
            这是底部，待补充
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      isDarkMode: false
    }
  },
  mounted() {
    // 初始化主题切换功能
    this.initThemeToggle();
    
    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyDarkTheme();
    }
  },
  methods: {
    initThemeToggle() {
      const themeToggle = document.getElementById('myRadio');
      if (themeToggle) {
        themeToggle.addEventListener('click', this.toggleTheme);
      }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      
      // 添加过渡类名
      document.body.classList.add('theme-transitioning');
      
      if (this.isDarkMode) {
        this.applyDarkTheme();
        localStorage.setItem('theme', 'dark');
      } else {
        this.applyLightTheme();
        localStorage.setItem('theme', 'light');
      }
      
      // 更新切换按钮状态
      const themeToggle = document.getElementById('myRadio');
      if (themeToggle) {
        if (this.isDarkMode) {
          themeToggle.classList.add('active');
        } else {
          themeToggle.classList.remove('active');
        }
      }
      
      // 过渡完成后移除过渡类名
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 300);
    },
    applyDarkTheme() {
      const root = document.documentElement;
      // 黑暗模式：深灰色、浅灰色、深蓝色为主题色，文字用反差色
      root.style.setProperty('--backColor', '#1a1a1a');        // 深灰色背景
      root.style.setProperty('--headerCOlor', '#2c3e50');      // 深蓝色卡片
      root.style.setProperty('--fontColor', '#ecf0f1');        // 浅色文字（反差色）
      root.style.setProperty('--headerFont', '#ecf0f1');       // 浅色文字
      root.style.setProperty('--bagColor', '#34495e');         // 深蓝灰色
      root.style.setProperty('--borderline', '#4a5568');       // 浅灰色边框
      root.style.setProperty('--headerhover', 'rgba(52, 73, 94, 0.8)'); // 深蓝色悬停
      root.style.setProperty('--mainColor', '#3498db');        // 蓝色强调色
      root.style.setProperty('--titleColor', '#ecf0f1');       // 标题浅色文字
      root.style.setProperty('--titleTagColor', '#bdc3c7');    // 标签浅灰色文字
      
      // 切换背景图片为黑暗模式
      const navigationElement = document.querySelector('.navigation');
      if (navigationElement) {
        navigationElement.classList.add('active');
      }
    },
    applyLightTheme() {
      const root = document.documentElement;
      // 明亮模式：文字用黑色、深灰色、深蓝色，背景用反差色
      root.style.setProperty('--backColor', '#ffffff');        // 白色背景（反差色）
      root.style.setProperty('--headerCOlor', '#ecf0f1');      // 浅色卡片背景（反差色）
      root.style.setProperty('--fontColor', '#2c3e50');        // 深蓝色文字
      root.style.setProperty('--headerFont', '#2c3e50');       // 深蓝色文字
      root.style.setProperty('--bagColor', '#f8f9fa');         // 浅灰色背景（反差色）
      root.style.setProperty('--borderline', '#34495e');       // 深灰色边框
      root.style.setProperty('--headerhover', 'rgba(236, 240, 241, 0.9)'); // 浅色悬停（反差色）
      root.style.setProperty('--mainColor', '#e74c3c');        // 红色强调色
      root.style.setProperty('--titleColor', '#2c3e50');       // 标题深蓝色文字
      root.style.setProperty('--titleTagColor', '#34495e');    // 标签深灰色文字
      
      // 切换背景图片为明亮模式
      const navigationElement = document.querySelector('.navigation');
      if (navigationElement) {
        navigationElement.classList.remove('active');
      }
    }
  }
}
</script>

<style>
/* 正文 */
 .content-li.li1 {
  display: flex;
  justify-content: space-between;
}

.content-li.li1>.li1-box {
  position: relative;
  flex: 0 0 32%;
  background-color: var(--headerCOlor);
  min-height: 200px;
  text-align: center;
  border-radius: 10px;
  padding: 30px 20px;
  box-sizing: border-box;

}

.li1-box>span {
  /* margin-top: 25px; */
  font-size: 24px;
  font-weight: 900;
  color: var(--headerFont);
  line-height: 20px;
  display: inline-block;
}

.li1-box>span.tag{
  color: var(--mainColor);
  font-size: 18px;
}

.li1-box>p {
  /* text-transform: uppercase; */
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--headerFont);
  transition: .4s ease-in-out;
  margin: 0px;
}

/* 公共 */
.content-li>h3 {
  display: flex;
  align-items: center;
  color: var(--headerFont);
}

.content-li .borderbotm {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
}

/* 第二块 */

.li2-box {
  /* width: 100%; */
  min-height: 40px;
  padding: 40px;
  box-shadow: 0 2px 4px -2px rgb(0 0 0 / 15%);
}

/* 插入结束引号 */
.li2-box blockquote::after {
  margin: 0;
  width: 50px;
  color: var(--mainColor);
  line-height: 55px;
  content: '"';
  position: absolute;
  
  bottom: -70px;
  right: -30px;

  font-size: 54px;
}

/* 插入开始引号 */
.li2-box blockquote::before {
  margin: 0;
  color: var(--mainColor);
  width: 50px;
  line-height: 55px;
  content: '"';
  position: absolute;
  top: -50px;
  left: -25px;
  font-size: 54px;
}

/* 引用样式 */
.li2-box blockquote {
  position: relative;
  padding: 0;
  margin: 0;
  display: block;
  color: var(--headerFont);
  font-style: italic;
  font-size: 16px;
  font-weight: 500;
}

/* 第三段 */
.li3-box {
  position: relative;
  min-height: 380px;
  background-image: url("../assets/img/videoback.jpg");
  background-size: 100%;
}

.li3-box>.play-buttom {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  background-color: var(--mainColor);
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 30px;

}

.play-buttom::after {
  position: absolute;
  content: '';
  display: inline-block;
  width: 60px;
  height: 60px;
  left: 0px;
  top: 0px;
  z-index: -1;
  background-color: inherit;
  border-radius: 50%;
  animation: playbuttom 1s infinite;
}

@keyframes playbuttom {
  from {
    opacity: 1;
    transform: scale(0.9);
  }

  to {
    opacity: 0;
    transform: scale(1.5);
  }
}

.play-buttom svg {
  vertical-align: -13px;
}

/* 第四 */
.li4-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.li4-box>div {
  box-sizing: border-box;
  padding: 25px;
  flex: 0 0 48%;
  min-height: 250px;
  margin-bottom: 20px;


  font-weight: 500;
  letter-spacing: .05em;
  -webkit-font-smoothing: antialiased;
}

.li4-box>div p {
  font-size: 13px;
  color: #7B7B7D;
}

.li4-box>div a {
  position: relative;
  display: inline-block;
  color: var(--mainColor);
  margin-top: 10px;
  cursor: pointer;
  padding-right: 30px;
}
.li4-box>div a::after{
  position: absolute;
  right: 10px;
  top: 50%;
  content: '';
  width: 0px;
  height: 0px;
  border-top: 4px solid transparent;
  border-left: 8px solid var(--mainColor);
  border-bottom: 4px solid transparent;
  animation: bmove 1s infinite;
}

.li4-box svg path{
  fill: var(--headerFont);
}
.li4icon {
  width: 45px;
  height: 45px;
}

/* 第五 */
.li5-box {
  position: relative;
  overflow: hidden;
}

svg {
  vertical-align: sub;
}
.li5-box .left,.li5-box .right{
  transition: .3s ease;
  position: absolute;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: var(--headerCOlor);
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  z-index: 1;
  color: white;
  top: 10%;
  opacity: 0;
}

.li5-box:hover .left{
  transform: translateX(100%);
  opacity: 1;
  background-color: var(--mainColor);
}
.li5-box:hover .right {
  transform: translateX(-100%);
  opacity: 1;
  background-color: var(--bagColor);
}

.li5-box .left {
  right: 15%;
}
.li5-box .right {
  left: 15%;
}

.li5box-ul {
  min-width: 100%;
  transition: transform 1s ease;
  transform: translate3d(0px, 0px, 0px);
  transition-duration: 1s;
  /* min-height: 250px; */
  /* background-color: aqua;
    transition-duration: 0ms;
    transform: translate3d(-0%, 10px, 10px); */
}

.li5box-car {
  display: inline-block;
  height: 300px;
  box-sizing: border-box;
  width: 680px;
  text-align: center;
  padding: 50px 20px;
}

.li5box-car>img {
  width: 50px;
  height: 50px;
  border: solid 3px #FCFCFE;
  border-radius: 50%;
  box-shadow: 0 2px 4px -2px rgb(0 0 0 / 15%);

}

.li6-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.li6-box a{
  display: block;
  color: var(--mainColor);
  margin-top: 10px;
  cursor: pointer;
}
.li6-box>div {
  display: inline-block;
  overflow: hidden;
  flex: 0 0 48%;
  margin-bottom: 20px;
}

.li6-box .borderbotm {
  margin-left: 0px;
  margin-right: 0px;
}

.li6car-title {
  padding: 20px;
}
.li6-box .imgbox{
  display: block;
  overflow: hidden;
  margin-top: 0px;
}
.li6-box img{
  transform: scale(1.1);
  height: 100%;
  transition: all .3s ease-in-out;
}
.li6-box img:hover{
  transform: scale(1);
}


/* 第七个 */
.li7-box{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.li7boxitem{
  flex: 0 0 48%;
  min-height: 300px;
  text-align: center;
  padding: 50px 0;
  position: relative;
  overflow: hidden;
}

.li7boxitem.active::after{
  content: '欢迎聘用';
  text-align: center;
  color: #fcfcfe;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 20px;
  height: 20px;
  padding: 0 40px;
  background-color: var(--mainColor);
  transform: rotate(45deg);
  position: absolute;
  top: 23px;
  right: -40px;
}

.li7boxitem h3{
  margin-bottom: 30px;
}
.li7boxitem p{
  margin: 15px 0;
}

.li7boxitem button{
  white-space: nowrap;
  background-color: var(--mainColor);
  border: solid 2px var(--mainColor);
  height: 30px;
  color: var(--headerFont);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 20px;
  padding: 0 30px;
}


.throughline{
  text-decoration: line-through;
  opacity: .5;
}
.item-price{
  font-size: 28px;
  font-family: fantasy;
  text-align: center;
}
.item-price sub{
    font-size: 14px;
    color: rgba(204, 205, 207, 0.7);
    font-weight: 300;
    vertical-align: middle;
}


    /* 手机*/
    @media screen and (max-width: 550px) {
      .content-li{
        display: block;
      }
       .li1{
        display: block !important;
      }
      .li4-box{
        display: block;
      }
      .li6-box{
        display: block;
      }
      .li7-box{
        display: block;
      }
      .li5box-car{
        width:auto;
      }
    }

/* 主题切换过渡动画 */
body.theme-transitioning,
body.theme-transitioning * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
}

/* 为根元素的CSS变量添加过渡效果 */
:root {
  transition: all 0.3s ease;
}

/* 为主要元素添加平滑过渡 */
.header,
.carbox,
.navigation,
.content-li,
.li1-box,
.li2-box,
.li3-box,
.li4-box > div,
.li5-box,
.li6-box > div,
.li7boxitem {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* 为文字元素添加颜色过渡 */
h1, h2, h3, h4, h5, h6, p, span, a, li {
  transition: color 0.3s ease;
}

/* 为SVG图标添加过渡 */
svg path {
  transition: fill 0.3s ease;
}
</style>