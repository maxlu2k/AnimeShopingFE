<template>
  <div class="container my-3">
    <div class="row px-xl-5 py-5 bg-white border-0 rounded">
      <div class="row g-3 justify-content-between">
        <div class="col-4">
          <input
            type="search"
            id="phone"
            class="form-control border border-1"
            v-model="search"
            placeholder="Tên sản phẩm"
            aria-labelledby="phone"
          />
        </div>

        <div class="col-4">
          <div class="row">
            <div class="col-6">
              <select
                class="form-select border border-1 mb-3 text-center"
                aria-placeholder="Trạng thái"
                v-model="status"
                @change="onChangeStatus"
              >
                <option value="" selected>Tất cả</option>
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-4">
          <button
            class="btn"
            @click="loadItems()"
            type="submit"
            style="background-color: green; color: white"
          >
            Tìm
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-funnel-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"
              />
            </svg>
          </button>
          <button
            class="btn"
            style="margin-left: 20px; background-color: brown; color: white"
            @click="clearInput()"
            type="submit"
          >
            Hiển thị
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
              />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </button>
          <button
            class="btn btn-info"
            style="margin-left: 20px"
            @click="createProduct()"
            href="#exampleModalToggle"
            role="button"
            type="submit"
          >
            Thêm
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="row">
        <div
          class="col-2 border border-1 rounded"
          style=" height: 35px; margin-left: 11px"
        >
          <el-dropdown class="m-2">
            <div class="dropdownbox el-dropdown-link">
              <div class="filter_group-subtitle">
                <span style="font-size: medium; margin-right: 80px"
                  >Thể loại</span
                >
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>
            <template #dropdown>
              <div
                class="dropdownitem d-flex flex-column"
                style="width: 150px; font-size: 15px; margin: 15px"
              >
                <div v-for="(category, index) in categories" :key="index">
                  <label>
                    <input
                      type="checkbox"
                      v-model="category.checked"
                      @change="handleFilterCategories"
                    />
                    {{ category.name }}
                  </label>
                </div>
              </div>
            </template>
          </el-dropdown>
        </div>

        <div
          class="col-3 border border-1 rounded"
          style="width: 280px; height: 35px; margin-left: 15px"
        >
          <el-dropdown class="m-2">
            <div class="dropdownbox el-dropdown-link">
              <div class="filter_group-subtitle">
                <span style="font-size: medium; margin-right: 130px"
                  >Thương hiệu</span
                >
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>
            <template #dropdown>
              <div
                class="dropdownitem d-flex flex-column"
                style="width: 150px; font-size: 15px; margin: 15px"
              >
                <div
                  v-for="(manufacturer, index) in manufacturers"
                  :key="index"
                >
                  <label>
                    <input
                      type="checkbox"
                      v-model="manufacturer.checked"
                      @change="handleFilterManufacturer"
                    />
                    {{ manufacturer.name }}
                  </label>
                </div>
              </div>
            </template>
          </el-dropdown>
        </div>

        <div
          class="col-2 border border-1 rounded"
          style=" height: 35px; margin-left: 15px"
        >
          <el-dropdown class="m-2">
            <div class="dropdownbox el-dropdown-link">
              <div class="filter_group-subtitle">
                <span style="font-size: medium; margin-right: 80px"
                  >Thuộc bộ</span
                >
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>
            <template #dropdown>
              <div
                class="dropdownitem d-flex flex-column"
                style="width: 150px; font-size: 15px; margin: 15px"
              >
                <div v-for="(seri, index) in series" :key="index">
                  <label>
                    <input
                      type="checkbox"
                      v-model="seri.checked"
                      @change="handleFilterSeries"
                    />
                    {{ seri.name }}
                  </label>
                </div>
              </div>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="row mt-5">
        <CTabContent>
          <table
            class="table bg-white border border-1 my-5 rounded"
            style="font-family: Arial, Helvetica, sans-serif; color: black"
          >
            <thead>
              <tr class="table-primary text-center" style="font-size: 18px">
                <th class="border">STT</th>
                <th class="border" @click="sortTable('id')">
                  Mã sản phẩm<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </th>
                <th class="border" @click="sortTable('figure')">
                  Tên sản phẩm<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </th>
                <th class="border" @click="sortTable('quantity')">
                  Số lượng<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </th>
                <th class="border" @click="sortTable('price')">
                  Giá nhập<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </th>
                <th class="border text-center" @click="sortTable('priceNew')">
                  Giá bán ra<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </th>
                <th class="border" @click="sortTable('available')">
                  Trạng thái<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </th>
                <th colspan="3" class="border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody v-if="showTable">
              <tr v-for="(item, index) in items" :key="index">
                <th class="border text-center align-middle" scope="row">
                  {{ beginIndex + index + 1 }}
                </th>
                <td class="border text-center align-middle">
                  SP0{{ item.id }}
                </td>
                <td class="border text-center align-middle">
                  {{ item.figure }}
                </td>
                <td class="border text-center align-middle">
                  {{ item.quantity }}
                </td>
                <td class="border text-center align-middle">
                  {{ formatPrice(item.price) }}
                </td>
                <td class="border text-center align-middle">
                  {{ formatPrice(item.priceNew) }}
                </td>
                <td class="text-center align-middle">
                  {{ item.availableName }}
                </td>
                <td class="text-center align-middle">
                  <a @click="getDetail(item.id)" class="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </a>
                  <a v-if="item.available == true" @click="lock(item.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                      />
                    </svg>
                  </a>
                  <a v-if="item.available == false" @click="unlock(item.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-unlock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-if="this.showAlert">
              <span>Không có thông tin</span>
            </tbody>
          </table>
          <div class="row my-5">
            <div class="col-2" style="width: 150px">
              <select
                class="form-select border border-1"
                v-model="pageSize"
                @change="onPageSizeChange"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div class="col-8">
              <nav>
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                    <a class="page-link" @click="goToPage(currentPage - 1)">
                      <CIcon :icon="cilList" size="l" />Pre
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="page in pageCount"
                    :key="page"
                    :class="{ active: page === currentPage }"
                  >
                    <a class="page-link" @click="goToPage(page)">{{ page }}</a>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                  >
                    <a class="page-link" @click="goToPage(currentPage + 1)">
                      <CIcon :icon="cilList" size="l" />Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </CTabContent>
      </div>
    </div>
  </div>
  <!-- Thêm sản phẩm -->
  <v-dialog width="1200"
    v-model="themSp"
    @close="
      () => {
        themSp = false;
      }
    "
  >
    <v-card>
      <div class="modal-header">
        <v-card-title>
          <div style="text-align: center; margin-right: 500px">
            Thêm sản phẩm
          </div>
        </v-card-title>
      </div>
      <div class="modal-body">
        <div class="row" style="padding-left: 15px">
          <form>
            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Tên sản phẩm</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="nameSp"
                    @blur="validateFigure"
                    v-model="product.figure"
                  />
                  <label v-if="validateForm.figure" style="color: red">{{
                    validateForm.figure
                  }}</label>
                </div>
              </div>

              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Chiều cao</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="heightSp"
                    @blur="validateHeight"
                    v-model="product.height"
                  />
                  <label style="color: red" v-if="validateForm.height">{{
                    validateForm.height
                  }}</label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Cân nặng</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="weightSp"
                    @blur="validateWeight"
                    v-model="product.weight"
                  />
                  <label style="color: red" v-if="validateForm.weight">{{
                    validateForm.weight
                  }}</label>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Độ tuổi</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="recommendedAgeSp"
                    @blur="validateAge"
                    v-model="product.recommendedAge"
                  />
                  <div v-if="validateForm.recommendedAge" class="text-danger">
                    {{ validateForm.recommendedAge }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Giá nhập</label
                >
                <div class="col-lg-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="priceSp"
                    @blur="validatePrice"
                    v-model="product.priceEnter"
                    @input="formatPriceInputPriceCreate"
                  />
                  <label style="color: red" v-if="validateForm.price">{{
                    validateForm.price
                  }}</label>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Số lượng</label
                >
                <div class="col-lg-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="quantitySp"
                    @blur="validateQuantity"
                    v-model="product.quantity"
                  />
                  <label style="color: red" v-if="validateForm.quantity">{{
                    validateForm.quantity
                  }}</label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Giá bán</label
                >
                <div class="col-lg-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="priceNewSp"
                    @blur="validatePriceNew"
                    @input="formatPriceInputPriceCreateNew"
                    v-model="product.priceEnterNew"
                  />
                  <label style="color: red" v-if="validateForm.priceNew">{{
                    validateForm.priceNew
                  }}</label>
                </div>
              </div>
              <div class="row col-6 mb-3" >
                <div class="row">
                  <label for="inputPassword3" class="col-3 col-form-label"
                  >Nhà cung cấp</label
                >
                <select style="width: 400px;"
                  class="form-control col-2"
                  v-model="product.manufacturerID"
                  id="manufacturerIDSp"
                  @blur="validateManufacture"
                >
                  <option value="">Chọn Nhà cung cấp</option>
                  <option
                    v-for="manufacture in manufacturers"
                    :key="manufacture.id"
                    :value="manufacture.id"
                  >
                    {{ manufacture.name }}
                  </option>
                </select>
                </div>
              
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateForm.manufacturerID"
                  >{{ validateForm.manufacturerID }}</label
                >
              </div>
            </div>
            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Tỉ lệ</label
                >
                <select  style="width: 400px;"
                  class="form-control col-9"
                  v-model="product.ratio"
                  id="ratioSp"
                  @blur="validateRatio"
                >
                  <option value="" selected>Chọn tỉ lệ</option>
                  <option value="1/10">1/10</option>
                  <option value="1/8">1/8</option>
                  <option value="1/7">1/7</option>
                  <option value="1/6">1/6</option>
                  <option value="1/5">1/5</option>
                  <option value="1/4">1/4</option>
                  <option value="1/3">1/3</option>
                  <option value="1/2">1/2</option>
                  <option value="1/1">1/1</option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateForm.ratio"
                  >{{ validateForm.ratio }}</label
                >
              </div>
              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Thể loại</label
                >
                <select  style="width: 400px;"
                  class="form-control col-9"
                  v-model="product.categoryId"
                  id="categoryIdSp"
                  @blur="validateCategory"
                >
                  <option value="">Chọn thể loại</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateForm.categoryId"
                  >{{ validateForm.categoryId }}</label
                >
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="materialSp" class="col-sm-3 col-form-label"
                  >Chất liệu</label
                >
                <select style="width: 400px;"
                  class="form-control col-9"
                  v-model="product.material"
                  id="materialSp"
                  @blur="validateMaterial"
                >
                  <option value="" selected>Chọn chất liệu</option>
                  <option value="PVC">Nhựa PVC ( nhựa cứng)</option>
                  <option value="ABS">Nhựa ABS ( nhựa dẻo)</option>
                  <option value="Resin">Nhựa Resin</option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateForm.material"
                  >{{ validateForm.material }}</label
                >
              </div>
              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Thuộc bộ</label
                >
                <select  style="width: 400px;"
                  class="form-control col-9"
                  v-model="product.seriesID"
                  id="seriesIDSp"
                  @blur="validateSeries"
                >
                  <option value="">Chọn bộ</option>
                  <option
                    v-for="item in series"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateForm.seriesID"
                  >{{ validateForm.seriesID }}</label
                >
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Giới tính</label
                >
                <div class="col-sm-9 mb-3">
                  <div class="col-sm-9 p-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        checked
                        type="radio"
                        name="flexRadioDefault"
                        value="true"
                        id="flexRadioDefault1"
                        v-model="product.gender"
                      />
                      <label
                        class="form-check-label"
                        style="color: black"
                        for="flexRadioDefault1"
                      >
                        Nam
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value="false"
                        v-model="product.gender"
                        id="flexRadioDefault2"
                        checked
                      />
                      <label
                        style="color: black"
                        class="form-check-label"
                        for="flexRadioDefault2"
                      >
                        Nữ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Phụ kiện đi kèm</label
                >
                <div class="col-sm-9 p-0">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="product.accessoriesIncluded"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Thêm ảnh</label
                >
                <div class="col-sm-9 mb-3 p-0">
                  <div>
                    <!-- <input
                      type="file"
                      class="form-control"
                      ref="input"
                      @change="handleFileUpload"
                      multiple
                    /> -->
                    <input
                    type="file"
                    class="custom-file-input form-control"
                    id="customFile"
                    name="files[]"
                    multiple
                    @change="handleFileUpload"
                  />
                  </div>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Mô tả</label
                >
                <div class="col-sm-9 mb-3 p-0">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    style="color: black"
                    v-model="product.description"
                  ></textarea>
                </div>
              </div>

              <div class="row m-auto">
                <div id="carouselExample" class="carousel slide col-6">
                  <div class="carousel-inner">
                    <div
                      class="carousel-item"
                      v-for="(image, index) in images"
                      :key="index"
                      :class="{ active: index === 0 }"
                    >
                      <img
                        :src="
                          'http://localhost:8000/api/products/show?url=' + image
                        "
                        class="d-block w-100 h-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon bg-black"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon bg-black"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <v-card-actions>
          <v-btn
            color="secondary"
            @click="
              () => {
                themSp = false;
              }
            "
          >
            Close
          </v-btn>
          <v-btn color="primary" @click="create()">Thêm sản phẩm</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>

  <!-- Cập nhật - xem chi tiết -->
  <v-dialog
    size="xl"
    width="1500"
    v-model="capnhatSp"
    @close="
      () => {
        capnhatSp = false;
      }
    "
  >
    <v-card style="padding-left: 15px">
      <div class="modal-header">
        <v-card-title>
          <div style="text-align: center; margin-right: 500px">
            Chi tiết sản phẩm
          </div>
        </v-card-title>
      </div>
      <div class="modal-body">
        <div class="row">
          <form>
            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Tên sản phẩm</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="figureU"
                    @blur="validateFigureU"
                    v-model="producDetail.figure"
                  />
                  <label v-if="validateFormUpdate.figure" style="color: red">{{
                    validateFormUpdate.figure
                  }}</label>
                </div>
              </div>

              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Chiều cao</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="heightU"
                    @blur="validateHeightU"
                    v-model="producDetail.height"
                  />
                  <label v-if="validateFormUpdate.height">{{
                    validateFormUpdate.height
                  }}</label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Cân nặng</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="weightU"
                    @blur="validateWeightU"
                    v-model="producDetail.weight"
                  />
                  <label style="color: red" v-if="validateFormUpdate.weight">{{
                    validateFormUpdate.weight
                  }}</label>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Độ tuổi</label
                >
                <div class="col-sm-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="recommendedAgeU"
                    @blur="validateAgeU"
                    v-model="producDetail.recommendedAge"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Giá Nhập</label
                >
                <div class="col-lg-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="priceU"
                    @blur="validatePriceU"
                    v-model="producDetail.price"
                  />
                  <!--  @input="formatPriceInput"  -->
                  <label style="color: red" v-if="validateFormUpdate.price">{{
                    validateFormUpdate.price
                  }}</label>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Số lượng</label
                >
                <div class="col-lg-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="quantityU"
                    @blur="validateQuantityU"
                    v-model="producDetail.quantity"
                  />
                  <label
                    style="color: red"
                    v-if="validateFormUpdate.quantity"
                    >{{ validateFormUpdate.quantity }}</label
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Giá bán</label
                >
                <div class="col-lg-9 p-0">
                  <input
                    type="text"
                    class="form-control"
                    id="priceNewU"
                    @blur="validatePriceU"
                    v-model="producDetail.priceNew"
                  />
                  <!--  @input="formatPriceInput"  -->
                  <label
                    style="color: red"
                    v-if="validateFormUpdate.priceNew"
                    >{{ validateFormUpdate.priceNew }}</label
                  >
                </div>
              </div>

              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Nhà cung cấp</label
                >
                <select style="width: 400px;"
                  class="form-control col-9"
                  v-model="producDetail.manufacturerID"
                  @blur="validateManufactureU"
                  id="manufacturerIDU"
                >
                  <option value="">Chọn Nhà cung cấp</option>
                  <option
                    v-for="manufacture in manufacturers"
                    :key="manufacture.id"
                    :value="manufacture.id"
                  >
                    {{ manufacture.name }}
                  </option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateFormUpdate.manufacturerID"
                  >{{ validateFormUpdate.manufacturerID }}</label
                >
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Tỉ lệ</label
                >
                <select style="width: 400px;"
                  class="form-control col-9"
                  v-model="producDetail.ratio"
                  id="ratioU"
                  @blur="validateRatioU"
                >
                  <option value="" selected>Chọn tỉ lệ</option>
                  <option value="1/10">1/10</option>
                  <option value="1/8">1/8</option>
                  <option value="1/7">1/7</option>
                  <option value="1/6">1/6</option>
                  <option value="1/5">1/5</option>
                  <option value="1/4">1/4</option>
                  <option value="1/3">1/3</option>
                  <option value="1/2">1/2</option>
                  <option value="1/1">1/1</option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateFormUpdate.ratio"
                  >{{ validateFormUpdate.ratio }}</label
                >
              </div>
              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Thể loại</label
                >
                <select style="width: 400px;"
                  class="form-control col-9"
                  v-model="selectedCategoryId"
                  id="categoryIdU"
                  @blur="validateCategoryU"
                >
                  <option value="">Chọn thể loại</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateFormUpdate.categoryId"
                  >{{ validateFormUpdate.categoryId }}</label
                >
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Chất liệu</label
                >
                <select style="width: 400px;"
                  class="form-select col-9"
                  id="materialU"
                  @blur="validateMaterialU"
                  aria-label="Default select example"
                  v-model="producDetail.material"
                >
                  <option value="" selected>Chọn chất liệu</option>
                  <option value="PVC">Nhựa PVC ( nhựa cứng)</option>
                  <option value="ABS">Nhựa ABS ( nhựa dẻo)</option>
                  <option value="Resin">Nhựa Resin</option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateFormUpdate.material"
                  >{{ validateFormUpdate.material }}</label
                >
              </div>

              <div class="row col-6 mb-3">
                <label for="inputPassword3" class="col-sm-3 col-form-label"
                  >Thuộc bộ</label
                >
                <select style="width: 400px;"
                  class="form-control col-9"
                  v-model="producDetail.seriesID"
                  id="seriesIDU"
                >
                  <option value="">Chọn bộ</option>
                  <option
                    v-for="item in series"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <label
                  style="margin-left: 130px; color: red"
                  v-if="validateFormUpdate.seriesID"
                  >{{ validateFormUpdate.seriesID }}</label
                >
              </div>
            </div>
            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Giới tính</label
                >
                <div class="col-sm-9 mb-3">
                  <div class="col-sm-9 p-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value="true"
                        id="flexRadioDefault1"
                        v-model="producDetail.gender"
                      />
                      <label
                        class="form-check-label"
                        style="color: black"
                        for="flexRadioDefault1"
                      >
                        Nam
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value="false"
                        v-model="producDetail.gender"
                        id="flexRadioDefault2"
                      />
                      <label
                        style="color: black"
                        class="form-check-label"
                        for="flexRadioDefault2"
                      >
                        Nữ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Phụ kiện đi kèm</label
                >
                <div class="col-sm-9 p-0">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="producDetail.accessoriesIncluded"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Thêm ảnh</label
                >
                <div class="col-sm-9 mb-3 p-0">
                  <div>
                    <input
                      type="file"
                      class="form-control"
                      ref="input"
                      @change="handleFileUploadDetail"
                      multiple
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row col-6 mb-3">
                <label for="inputEmail3" class="col-sm-3 col-form-label"
                  >Mô tả</label
                >
                <div class="col-sm-9 mb-3 p-0">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    style="color: black"
                    v-model="producDetail.description"
                  ></textarea>
                </div>
              </div>

              <div class="row m-auto">
                <div id="carouselExample" class="carousel slide col-6">
                  <div class="carousel-inner">
                    <div
                      class="carousel-item"
                      v-for="(image, index) in imagesDetail"
                      :key="index"
                      :class="{ active: index === 0 }"
                    >
                      <img
                        :src="
                          'http://localhost:8000/api/products/show?url=' +
                          image.url
                        "
                        class="d-block w-100 h-100"
                        alt="..."
                      />
                      <div class="carousel-caption d-none d-md-block m-3">
                        <button
                          class="btn"
                          style="color: black; background-color: aliceblue"
                          @click="editImage(index, image.id, producDetail.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon bg-black"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon bg-black"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <v-card-actions>
          <v-btn
            color="secondary"
            @click="
              () => {
                capnhatSp = false;
              }
            "
          >
            Close
          </v-btn>
          <v-btn color="primary" @click="updateProduct()">Lưu</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>

  <!-- Khoá sản phẩm -->
  <v-dialog
    size="sm"
    :visible="capnhatStatusSp"
    @close="
      () => {
        capnhatStatusSp = false;
      }
    "
  >
    <v-card-actions>
      <div class="modal-body">Bạn có muốn khoá sản phẩm này</div>
      <div class="modal-footer">
        <v-btn
          color="secondary"
          @click="
            () => {
              capnhatStatusSp = false;
            }
          "
        >
          Đóng
        </v-btn>
        <v-btn color="primary" @click="updateStatus(false)">Đồng ý</v-btn>
      </div>
    </v-card-actions>
  </v-dialog>
  <!-- Mở Khoá sản phẩm -->
  <v-dialog
    size="sm"
    :visible="capnhatStatusSpUnlock"
    @close="
      () => {
        capnhatStatusSpUnlock = false;
      }
    "
  >
    <v-card-actions>
      <div class="modal-body">Bạn có muốn mở khoá sản phẩm này</div>
      <div class="modal-footer">
        <v-btn
          color="secondary"
          @click="
            () => {
              capnhatStatusSpUnlock = false;
            }
          "
        >
          Đóng
        </v-btn>
        <v-btn color="primary" @click="updateStatus(true)">Đồng ý</v-btn>
      </div>
    </v-card-actions>
  </v-dialog>
</template>
  
  <script>
import router from "@/router";
import Axios from "@/router/axios";
import check from "@/commons/jwt";
import axios from "axios";
import qs from "qs";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const rounter = useRouter();
const toast = useToast();
export default {
  data() {
    return {
      items: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      totalPages: 0,
      search: "",
      status: "",
      from: "",
      to: "",
      context: null,
      detailBill: [],
      sortKey: "",
      sortDir: "asc",
      idBill: 0,
      infor_response: null,
      showAlert: false,
      showTable: false,
      themSp: false,
      capnhatSp: false,
      capnhatStatusSp: false,
      capnhatStatusSpUnlock: false,
      productIdUnlock: null,
      productIdLock: null,
      beginIndex: null,
      showModal: false,
      productId: null,
      selectedCategoryId: "",
      selectRadio: "",
      categories: [],
      categoryIds: null,
      manufacturers: [],
      manufacturerIds: null,
      seriesIds: null,
      series: [],
      imgUrl: [],
      producDetail: [],
      imagesDetail: [],
      images: [],
      imagesUpdate: [],

      product: {
        figure: "",
        available: "",
        description: "",
        rate: "",
        ratio: "",
        quantity: "",
        material: "",
        title: 0,
        height: "",
        weight: "",
        recommendedAge: "",
        accessoriesIncluded: "",
        gender: "",
        manufacturerID: "",
        seriesID: "",
        categoryId: "",
        price: "",
        status: "",
        priceNew: "",
        priceEnter: "",
        priceEnterNew: "",
      },
      validateForm: {
        figure: "",
        available: "",
        description: "",
        rate: "",
        ratio: "",
        quantity: "",
        material: "",
        title: "",
        height: "",
        weight: "",
        recommendedAge: "",
        accessoriesIncluded: "",
        gender: "",
        manufacturerID: "",
        seriesID: "",
        categoryId: "",
        price: "",
        status: "",
        priceNew: "",
      },
      validateFormUpdate: {
        figure: "",
        available: "",
        description: "",
        rate: "",
        ratio: "",
        quantity: "",
        material: "",
        title: "",
        height: "",
        weight: "",
        recommendedAge: "",
        accessoriesIncluded: "",
        gender: "",
        manufacturerID: "",
        seriesID: "",
        categoryId: "",
        price: "",
        status: "",
        priceNew: "",
      },

      form: {
        character: "",
        available: "",
        manufacturerID: "",
        seriesID: "",
        categoryId: "",
      },
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    // filteredImages() {
    //   if(this.imagesDetail == null){
    //     return
    //   }
    //   return this.imagesDetail.filter((image) => image != null);
    // },

    displayedItems() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.items.slice(start, end);
    },
    formatPriceInputPriceCreate() {
      const value = this.product.priceEnter.replace(/\D/g, "");
      this.product.priceEnter = parseInt(value);
      this.product.price = this.product.priceEnter;
      this.product.priceEnter = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    formatPriceInputPriceCreateNew() {
      const value = this.product.priceEnterNew.replace(/\D/g, "");
      this.product.priceEnterNew = parseInt(value);
      this.product.priceNew = this.product.priceEnterNew;
      this.product.priceEnterNew = value.replace(
        /(\d)(?=(\d{3})+(?!\d))/g,
        "$1."
      );
    },
  },
  mounted() {
    this.loadItems();
    this.getManufacturer();
    this.getCategories();
    this.getSeries();
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },

    init() {
      this.loadItems();
    },
    async loadItems() {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      const params = {
        page: this.currentPage,
        size: this.pageSize,
        categoryIds: this.categoryIds,
        ratio: this.ratioIds,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        name: this.search,
        available: this.status,
        manufacturerID: this.manufacturerIds,
        seriesID: this.seriesIds,
        sortBy: this.sortField,
        sortDirection: this.sortOrder,
      };
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key];
      });
      const queryString = qs.stringify(params, { indices: false });
      const url = `products/getAll?${queryString}`;
      Axios.get(url)
        .then((response) => {
          if (response.data.infor_response.code === 200) {
            this.items = response.data.data.data;
            this.totalCount = response.data.data.totalRecords;
            this.totalPages = response.data.data.totalPages;
            this.beginIndex = response.data.data.beginIndex;
            this.showAlert = false;
            this.showTable = true;
          }
          if (response.data.infor_response.code === 404) {
            this.showAlert = true;
            this.showTable = false;
          }
        })
        .catch((error) => {
          this.showAlert = true;
          this.showTable = false;
        });
    },
    getCategories() {
      const apiUrl = "categories";
      Axios.get(apiUrl)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSeries() {
      const apiUrl = "series";
      Axios.get(apiUrl)
        .then((response) => {
          this.series = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFilterManufacturer() {
      const selectedManufacturers = this.manufacturers.filter(
        (manufacturer) => manufacturer.checked
      );
      this.manufacturerIds = selectedManufacturers.map(
        (manufacturer) => manufacturer.id
      );
      this.loadItems();
    },
    handleFilterCategories() {
      const selectedcategory = this.categories.filter(
        (category) => category.checked
      );
      this.categoryIds = selectedcategory.map((category) => category.id);
      this.loadItems();
    },
    handleFilterSeries() {
      const selectedSeries = this.series.filter((seri) => seri.checked);
      this.seriesIds = selectedSeries.map((seri) => seri.id);
      this.loadItems();
    },
    getManufacturer() {
      const apiUrl = "manufacturer";
      Axios.get(apiUrl)
        .then((response) => {
          this.manufacturers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearInput() {
      this.from = null;
      this.search = null;
      this.categoryIds = null;
      this.manufacturerIds = null;
      this.status = "";
      this.seriesIds = null;
      this.loadItems();
    },

    createProduct() {
      this.themSp = true;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
        this.loadItems();
      }
    },
    onPageSizeChange(event) {
      const pageSize = event.target.value;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.loadItems();
    },
    onChangeStatus(event) {
      const status = event.target.value;
      this.status = status;
      this.loadItems();
    },

    sortTable(column) {
      if (this.sortKey === column) {
        this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = column;
        this.sortDir = "asc";
      }
      this.items.sort((a, b) => {
        let modifier = 1;
        if (this.sortDir === "desc") modifier = -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },
    //validate
    validateFigure() {
      var nameSp = document.getElementById("nameSp");
      if (!this.product.figure) {
        this.validateForm.figure = "Tên sản phẩm không được để trống";
        nameSp.style.borderColor = "red";
      } else {
        nameSp.style.borderColor = "green";
        this.validateForm.figure = "";
      }
    },
    validateCategory() {
      var categoryIdSp = document.getElementById("categoryIdSp");
      if (!this.product.categoryId) {
        this.validateForm.categoryId = "Không được để trống loại sản phẩm";
        categoryIdSp.style.borderColor = "red";
      } else {
        categoryIdSp.style.borderColor = "green";
        this.validateForm.categoryId = "";
      }
    },
    validateManufacture() {
      var manufacturerIDSp = document.getElementById("manufacturerIDSp");
      if (!this.product.manufacturerID) {
        this.validateForm.manufacturerID = "Không được để trống nhà cung cấp";
        manufacturerIDSp.style.borderColor = "red";
      } else {
        manufacturerIDSp.style.borderColor = "green";
        this.validateForm.manufacturerID = "";
      }
    },
    validateMaterial() {
      var materialSp = document.getElementById("materialSp");
      if (!this.product.material) {
        this.validateForm.material = "Không được để trống chất liệu";
        materialSp.style.borderColor = "red";
      } else {
        materialSp.style.borderColor = "green";
        this.validateForm.material = "";
      }
    },

    validateSeries() {
      var seriesIDSp = document.getElementById("seriesIDSp");
      if (!this.product.seriesID) {
        this.validateForm.seriesID = "Không được để trống thuộc bộ";
        seriesIDSp.style.borderColor = "red";
      } else {
        seriesIDSp.style.borderColor = "green";
        this.validateForm.seriesID = "";
      }
    },
    validateAge() {
      var recommendedAgeSp = document.getElementById("recommendedAgeSp");
      if (
        isNaN(this.product.recommendedAge) ||
        this.product.recommendedAge <= 0
      ) {
        this.validateForm.recommendedAge = "Độ tuổi phải là số và lớn hơn 0";
        recommendedAgeSp.style.borderColor = "red";
      } else {
        recommendedAgeSp.style.borderColor = "green";
        this.validateForm.recommendedAge = "";
      }
    },
    validateRatio() {
      var ratioSp = document.getElementById("ratioSp");
      if (!this.product.ratio) {
        this.validateForm.ratio = "Không được để trống tỉ lệ";
        ratioSp.style.borderColor = "red";
      } else {
        ratioSp.style.borderColor = "green";
        this.validateForm.ratio = "";
      }
    },
    validateHeight() {
      var heightSp = document.getElementById("heightSp");
      if (!this.product.height) {
        this.validateForm.height = "Không được để trống chiều cao";
        heightSp.style.borderColor = "red";
      } else if (isNaN(this.product.height) || this.product.height <= 0) {
        this.validateForm.height = "Chiều cao phải là số và lớn hơn 0";
        heightSp.style.borderColor = "red";
      } else {
        heightSp.style.borderColor = "green";
        this.validateForm.height = "";
      }
    },
    validateWeight() {
      var weightSp = document.getElementById("weightSp");
      if (!this.product.weight) {
        this.validateForm.weight = "Không được để trống cân nặng";
        weightSp.style.borderColor = "red";
      } else if (isNaN(this.product.weight || this.product.weight <= 0)) {
        this.validateForm.weight = "Cân nặng phải là số và lớn hơn 0";
        weightSp.style.borderColor = "red";
      } else {
        weightSp.style.borderColor = "green";
        this.validateForm.weight = "";
      }
    },
    validatePrice() {
      var priceSp = document.getElementById("priceSp");
      if (!this.product.price) {
        this.validateForm.price = "Không được để trống giá";
        priceSp.style.borderColor = "red";
      } else if (isNaN(this.product.price || this.product.price <= 0)) {
        this.validateForm.price = "Giá phải là số và lớn hơn 0";
        priceSp.style.borderColor = "red";
      } else {
        priceSp.style.borderColor = "green";
        this.validateForm.price = "";
      }
    },
    validatePriceNew() {
      var priceSp = document.getElementById("priceNewSp");
      if (!this.product.priceNew) {
        this.validateForm.priceNew = "Không được để trống giá";
        priceSp.style.borderColor = "red";
      } else if (isNaN(this.product.priceNew || this.product.priceNew <= 0)) {
        this.validateForm.priceNew = "Giá phải là số và lớn hơn 0";
        priceSp.style.borderColor = "red";
      } else {
        priceSp.style.borderColor = "green";
        this.validateForm.priceNew = "";
      }
    },
    validateQuantity() {
      var quantitySp = document.getElementById("quantitySp");
      if (!this.product.quantity) {
        this.validateForm.quantity = "Không được để trống số lượng";
        quantitySp.style.borderColor = "red";
      } else if (isNaN(this.product.quantity || this.product.quantity <= 0)) {
        this.validateForm.quantity = "Số lượng phải là số và lớn hơn 0";
        quantitySp.style.borderColor = "red";
      } else {
        quantitySp.style.borderColor = "green";
        this.validateForm.quantity = "";
      }
    },
    //validate update

    validateFigureU() {
      var nameSp = document.getElementById("figureU");
      if (!this.producDetail.figure) {
        this.validateFormUpdate.figure = "Tên sản phẩm không được để trống";
        nameSp.style.borderColor = "red";
      } else {
        nameSp.style.borderColor = "green";
        this.validateFormUpdate.figure = "";
      }
    },
    validateCategoryU() {
      var categoryIdU = document.getElementById("categoryIdU");
      if (!this.producDetail.categoryId) {
        this.validateFormUpdate.categoryId =
          "Không được để trống loại sản phẩm";
        categoryIdU.style.borderColor = "red";
      } else {
        categoryIdU.style.borderColor = "green";
        this.validateFormUpdate.categoryId = "";
      }
    },
    validateManufactureU() {
      var manufacturerIDU = document.getElementById("manufacturerIDU");
      if (!this.producDetail.manufacturerID) {
        this.validateFormUpdate.manufacturerID =
          "Không được để trống nhà cung cấp";
        manufacturerIDU.style.borderColor = "red";
      } else {
        manufacturerIDU.style.borderColor = "green";
        this.validateFormUpdate.manufacturerID = "";
      }
    },
    validateMaterialU() {
      var materialU = document.getElementById("materialU");
      if (!this.producDetail.material) {
        this.validateFormUpdate.material = "Không được để trống chất liệu";
        materialU.style.borderColor = "red";
      } else {
        materialU.style.borderColor = "green";
        this.validateFormUpdate.material = "";
      }
    },

    validateSeriesU() {
      var seriesIDU = document.getElementById("seriesIDU");
      if (!this.producDetail.seriesID) {
        this.validateFormUpdate.seriesID = "Không được để trống thuộc bộ";
        seriesIDU.style.borderColor = "red";
      } else {
        seriesIDU.style.borderColor = "green";
        this.validateFormUpdate.seriesID = "";
      }
    },
    validateAgeU() {
      var recommendedAgeU = document.getElementById("recommendedAgeU");
      if (
        isNaN(this.producDetail.recommendedAge) ||
        this.producDetail.recommendedAge <= 0
      ) {
        this.validateFormUpdate.recommendedAge =
          "Độ tuổi phải là số và lớn hơn 0";
        recommendedAgeU.style.borderColor = "red";
      } else {
        recommendedAgeU.style.borderColor = "green";
        this.validateFormUpdate.recommendedAge = "";
      }
    },
    validateRatioU() {
      var ratioU = document.getElementById("ratioU");
      if (!this.producDetail.ratio) {
        this.validateFormUpdate.ratio = "Không được để trống tỉ lệ";
        ratioU.style.borderColor = "red";
      } else {
        ratioU.style.borderColor = "green";
        this.validateFormUpdate.ratio = "";
      }
    },
    validateHeightU() {
      var heightU = document.getElementById("heightU");
      if (!this.producDetail.height) {
        this.validateFormUpdate.height = "Không được để trống chiều cao";
        heightU.style.borderColor = "red";
      } else if (
        isNaN(this.producDetail.height) ||
        this.producDetail.height <= 0
      ) {
        this.validateFormUpdate.height = "Chiều cao phải là số và lớn hơn 0";
        heightU.style.borderColor = "red";
      } else {
        heightU.style.borderColor = "green";
        this.validateFormUpdate.height = "";
      }
    },
    validateWeightU() {
      var weightU = document.getElementById("weightU");
      if (!this.producDetail.weight) {
        this.validateFormUpdate.weight = "Không được để trống cân nặng";
        weightU.style.borderColor = "red";
      } else if (
        isNaN(this.producDetail.weight || this.producDetail.weight <= 0)
      ) {
        this.validateFormUpdate.weight = "Cân nặng phải là số và lớn hơn 0";
        weightU.style.borderColor = "red";
      } else {
        weightU.style.borderColor = "green";
        this.validateFormUpdate.weight = "";
      }
    },
    validatePriceU() {
      var priceU = document.getElementById("priceNewU");
      if (!this.producDetail.price) {
        this.validateFormUpdate.price = "Không được để trống giá";
        priceU.style.borderColor = "red";
      } else if (
        isNaN(this.producDetail.price || this.producDetail.price <= 0)
      ) {
        this.validateFormUpdate.price = "Giá phải là số và lớn hơn 0";
        priceU.style.borderColor = "red";
      } else {
        priceU.style.borderColor = "green";
        this.validateFormUpdate.price = "";
      }
    },
    validatePriceNewU() {
      var priceU = document.getElementById("priceNewU");
      if (!this.producDetail.priceNew) {
        this.validateFormUpdate.priceNew = "Không được để trống giá";
        priceU.style.borderColor = "red";
      } else if (
        isNaN(this.producDetail.priceNew || this.producDetail.priceNew <= 0)
      ) {
        this.validateFormUpdate.priceNew = "Giá phải là số và lớn hơn 0";
        priceU.style.borderColor = "red";
      } else {
        priceU.style.borderColor = "green";
        this.validateFormUpdate.priceNew = "";
      }
    },
    validateQuantityU() {
      var quantityU = document.getElementById("quantityU");
      if (!this.producDetail.quantity) {
        this.validateFormUpdate.quantity = "Không được để trống số lượng";
        quantityU.style.borderColor = "red";
      } else if (
        isNaN(this.producDetail.quantity || this.producDetail.quantity <= 0)
      ) {
        this.validateFormUpdate.quantity = "Số lượng phải là số và lớn hơn 0";
        quantityU.style.borderColor = "red";
      } else {
        quantityU.style.borderColor = "green";
        this.validateFormUpdate.quantity = "";
      }
    },

    // Code thêm
    async upload() {
      const formData = new FormData();
      var files = this.imgUrl;
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        formData.append("files", files[i]);
      }
      axios.post("producs/upload", formData, {}).then((res) => {
        console.log(res.data);
      });
    },
    showEditModal() {
      this.selectedIndex = index;
      this.showModal = true;
    },
    hideEditModal() {
      this.selectedIndex = null;
      this.newImage = null;
      this.showModal = false;
    },

    handleFileUpload(event) {
      const files = event.target.files
      if (files.length === 0) {
        return;
      }
      this.imgUrl = files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        console.log(file)
        if (
          !file.type.startsWith('image/') &&
          !file.type.startsWith('video/')
        ) {
          alert('File tải lên không phải là ảnh. Vui lòng chọn lại !')
          return
        }
        const url = URL.createObjectURL(file)
        const image = { name: file.name, url, type: file.type }
        this.images.push(image)
      }
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        formData.append('files', files[i])
      }

      axios.post('http://localhost:8000/api/products/upload', formData)
        .then(response => {
          this.images = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      // this.imgUrl = images
    },

    async create() {
      this.validateFigure();
      this.validateCategory();
      this.validateHeight();
      this.validateManufacture();
      this.validateMaterial();
      this.validatePrice();
      this.validateQuantity();
      this.validateSeries();
      this.validateWeight();
      this.validateRatio();
      this.validatePriceNew();

      if (
        this.validateForm.figure ||
        this.validateForm.categoryId ||
        this.validateForm.height ||
        this.validateForm.manufacturerID ||
        this.validateForm.material ||
        this.validateForm.price ||
        this.validateForm.priceNew ||
        this.validateForm.quantity ||
        this.validateForm.seriesID ||
        this.validateForm.weight ||
        this.validateForm.ratio
      ) {
        return;
      }
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        rounter.push({ path: "/pages/login" });
        return;
      }
      Axios.post("products", this.product, {})
        .then((response) => {
          if (response.data.infor_response.code == 200) {
            this.productId = response.data.data.id;
            const list = [];
            for (let i = 0; i < this.images.length; i++) {
              var imgUrls = {};
              imgUrls.productID = this.productId;
              imgUrls.url = this.images[i];
              list.push(imgUrls);
            }
            Axios.post("images", list).then((resp) => {});
            toast.success("Thêm sản phẩm thành công");
            this.themSp = false;
            this.loadItems();
          } else {
            toast.error("Thêm sản phẩm thất bại");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    async getDetail(id) {
      const res = await Axios.get("products/detail_product?id=" + id);
      this.producDetail = res.data.data;
      this.productId = this.producDetail.id;
      this.selectedCategoryId = this.producDetail.categoryId;
      this.imagesDetail = this.producDetail.listImage;
      this.capnhatSp = true;
    },
    editImage(index, id, productId) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.name = "files";
      input.enctype = "multipart/form-data";
      input.addEventListener("change", async () => {
        const formData = new FormData();
        formData.append("files", input.files[0]);
        Axios.post("products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          const list = {
            id: id,
            productID: productId,
            url: res.data[0],
          };
          this.imagesDetail.splice(index, 0, { url: res.data.url });
          Axios.put("images/update", list).then((resp) => {
            this.imagesDetail = resp.data;
            this.getDetail(productId);
          });
        });
      });
      input.click();
    },
    async handleFileUploadDetail(event) {
      const files = event.target.files;
      if (files.length === 0) {
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          !file.type.startsWith("image/") &&
          !file.type.startsWith("video/")
        ) {
          alert("File tải lên không phải là ảnh. Vui lòng chọn lại !");
          return;
        }
        const url = URL.createObjectURL(file);
        const image = { name: file.name, url, type: file.type };
        this.imagesUpdate.push(image);
      }
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      Axios.post("products/upload", formData)
        .then((response) => {
          this.images = response.data;

          const listDT = [];
          for (let i = 0; i < this.imagesDetail.length; i++) {
            var imgUrls = {};
            listDT.push(this.imagesDetail[i]);
          }
          Axios.delete("images", { data: this.imagesDetail })
            .then((resp) => {})
            .catch((err) => {});
          const list = [];
          for (let i = 0; i < this.images.length; i++) {
            var imgUrls = {};
            imgUrls.productID = this.productId;
            imgUrls.url = this.images[i];
            list.push(imgUrls);
          }
          Axios.post("images", list)
            .then((resp) => {
              this.imagesDetail = resp.data;
              this.getDetail(productId);
              toast.success("Cập nhật lại ảnh thành công thành công");
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateProduct() {
      this.validateFigureU();
      this.validateCategoryU();
      this.validateHeightU();
      this.validateManufactureU();
      this.validateMaterialU();
      this.validatePriceU();
      this.validateQuantityU();
      this.validatePriceNewU();
      this.validateSeriesU();
      this.validateWeightU();
      this.validateRatioU();

      if (
        this.validateFormUpdate.figure ||
        this.validateFormUpdate.categoryId ||
        this.validateFormUpdate.height ||
        this.validateFormUpdate.manufacturerID ||
        this.validateFormUpdate.material ||
        this.validateFormUpdate.price ||
        this.validateFormUpdate.priceNew ||
        this.validateFormUpdate.quantity ||
        this.validateFormUpdate.seriesID ||
        this.validateFormUpdate.weight ||
        this.validateFormUpdate.ratio
      ) {
        return;
      }
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        rounter.push({ path: "/pages/login" });
        return;
      }
      Axios.put("products", this.producDetail, {})
        .then((response) => {
          if (response.data.infor_response.code == 200) {
            this.productId = response.data.data.id;
            toast.success("Câp nhật sản phẩm thành công");
            this.capnhatSp = false;
            this.loadItems();
          } else {
            toast.error("Câp nhật sản phẩm thất bại");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    unlock(id) {
      this.capnhatStatusSpUnlock = true;
      this.productIdUnlock = id;
    },
    lock(id) {
      this.capnhatStatusSp = true;
      this.productIdLock = id;
    },
    async updateStatus(status) {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        rounter.push({ path: "/pages/login" });
        return;
      }
      if (status == false) {
        Axios.put(
          "products/available?id=" +
            this.productIdLock +
            "&available=" +
            status,
          "",
          {}
        )
          .then((response) => {
            if (response.data.infor_response.code == 200) {
              toast.success("Khoá sản phẩm thành công");
              this.capnhatStatusSp = false;
              this.loadItems();
            } else {
              toast.error("Khoá sản phẩm thất bại");
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        Axios.put(
          "products/available?id=" +
            this.productIdUnlock +
            "&available=" +
            status,
          "",
          {}
        )
          .then((response) => {
            if (response.data.infor_response.code == 200) {
              toast.success("Mở khoá sản phẩm thành công");
              this.capnhatStatusSpUnlock = false;
              this.loadItems();
            } else {
              toast.error("Mở khoá sản phẩm thất bại");
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    },
  },
  components: {},
};
</script>
  
  <style>
.is-invalid {
  border-color: red;
}
</style>