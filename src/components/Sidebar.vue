<template>
     <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
            </div>
            <div class="info">
              <a href="#" class="d-block">Alexander Pierce</a>
            </div>
          </div>
    
          <!-- SidebarSearch Form -->
          <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
              <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-sidebar">
                  <i class="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
    
          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
             
              <li class="nav-item">
                <router-link to="/dashboard"  class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                    Dashboard
                  </p>
                </router-link>
              </li>

               
              <li class="nav-item">
                <router-link to="/category"  class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                   Category
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/product"  class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                   Products
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dashboard"  class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                   Logout
                  </p>
                </router-link>
              </li>
              
    
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
</template>