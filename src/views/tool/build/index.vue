<template>
  <!-- 楼层管理 -->
  <div>
    <!-- 蒙版 -->
    <div class="mask" v-show="showAdd">
      <div
        class="bg-white w-[600px] h-[600px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] p-[20px] box-border"
      >
        <div class="flex justify-between text-[18px] text-[#606366]">
          <span>添加</span>
          <div @click="showAdd = false">
            <Icon icon="material-symbols:close" />
          </div>
        </div>
        <div>
          <div class="flex items-center mt-[30px]">
            <span class="w-[100px]"><span class="text-red-500">*</span>建筑物名</span>
            <div>
              <el-select v-model="buildName" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex items-center mt-[30px]">
            <span class="w-[100px]"><span class="text-red-500">*</span>楼层</span>
            <div class="block">
              <el-slider v-model="floor" vertical height="150px"> </el-slider>
            </div>
          </div>
          <div class="flex items-center mt-[30px]">
            <span class="w-[100px]"><span class="text-red-500">*</span>平面图</span>
            <div>
              <el-upload action="#" list-type="picture-card" :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </div>
          <div class="flex justify-end mt-[30px]">
            <el-button>取消</el-button>
            <el-button type="success">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Foordatalist } from '@/service';

const { log } = console;
export default {
  async created() {
    const getFoordatalist = await Foordatalist();
    this.FoordatalistAll = getFoordatalist.data.data.result;
    log('楼层管理列表', this.FoordatalistAll);
  },
  data() {
    return {
      showMask: false,
      // 楼层管理列表
      FoordatalistAll: [],
    };
  },
  methods: {},
};
</script>
