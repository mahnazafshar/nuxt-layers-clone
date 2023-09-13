<template>
    <div>
    <client-only>
      <t-tabs v-model="customTab">
        <template #title="{ title, selected, count }">
          <div class="mx-2 cursor-pointer min-w-max" :class="{ 'text-primary': selected }">
            <div
              class="w-6 h-6 rounded-full items-center justify-center text-white bg-gray-500"
            >
              {{ count }}
            </div>
            {{ title }}
          </div>
        </template>
        <t-tab-item :count="1" value="first-tab" eager title="tab1">
          ر صورتی که این ابزار برای شما کاربردی بوده است برای توسعه آن و سایر ابزارها با حمایت مالی همراه ما باشید.
        </t-tab-item>
        <t-tab-item :count="2" title="tab2">
          رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیش
        </t-tab-item>
        <t-tab-item :count="3" title="tab3">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
          a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
          passage, and going through the cites of the word in classical literature,
          discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
          popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
          sit amet..", comes from a line in section 1.10.32.
        </t-tab-item>
        <t-tab-item :count="1" title="tab4">
          There are many variations of passages of Lorem Ipsum available, but the majority
          have suffered alteration in some form, by injected humour, or randomised words
          which don't look even slightly believable. If you are going to use a passage of
          Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
          middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with a handful of
          model sentence structures, to generate Lorem Ipsum whi
        </t-tab-item>
      </t-tabs>
    </client-only>
     
      <hr />
      <d-modal
        v-model="dialogModel" 
        title="hi"
        data-dialog-add="bg-purple-900" 
        data-closeButton-delete="right-2" 
        data-closeButton-add="left-2 bg-gray-500" 
        data-title-add="text-purple-800 my-10"  
      >
        <form @submit.prevent="submit" method="get">
          <input name="hi" />
          <button type="submit">submit</button>
        </form>
      </d-modal>
      <button class="btn btn-primary" @click="openDialog">open</button>
      <hr/>
      <d-button 
        class="btn btn-primary" 
        loading 
        data-loadingContainer-add="w-18 px-10"
        data-loading-delete="loading-dots"
      >load button</d-button>
      <d-button 
        class="btn btn-primary" 
        loading
      >load button</d-button>
      <d-button class="btn btn-primary" >my button</d-button>
      <d-button 
        class="btn"
        data-container-add="bg-red-600 text-white" 
      >custom button</d-button>
      <nuxt-link to="/mahnaz">click</nuxt-link>
      <button @click="clickMe">click me</button>
    </div>
</template>
<script setup>
  const customTab = ref("1");
  const { model: dialogModel, open: openDialog } = useUiState();
  const submit = () => {
    alert("form submitted");
  };
  const clickMe=()=>{
    navigateTo({name:'mahnaz'})
  }
  const fetchHome=useHomeService();
  onMounted(()=>{
    fetchHome();
  })
</script>
  