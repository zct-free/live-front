<template>
  <div class="hbys-image">
    <div>
      <div>红包雨样式</div>
      <div class="tips">可自定义飘落红包、底部装饰图</div>
      <img src="/src/assets/images/hb1.png" alt="" />
      <a-button type="primary">保存</a-button>
    </div>
    <div>
      <div>红包封面</div>
      <div class="tips">可自定义弹出的红包封面</div>
      <img src="/src/assets/images/hb2.png" alt="" />
      <a-button type="primary">保存</a-button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.hbys-image {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tips {
      color: #969ba5;
      text-align: center;
      width: 170px;
      margin-bottom: 8px;
      font-size: 12px;
    }
  }

  img {
    width: 160px;
    height: 340px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  a-button {
    margin-top: 10px;
  }
}
</style>
