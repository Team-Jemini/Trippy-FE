<script setup>
import { ref, watch, computed, defineEmits } from "vue";
import { Icon } from '@iconify/vue';
import NextButton from '@/components/common/buttons/NextButton.vue';

const isChecked1 = ref(false);
const isChecked2 = ref(false);
const isChecked3 = ref(false);
const isButtonDisabled = ref(true);

const emit = defineEmits(["next"]);

watch([isChecked1, isChecked2, isChecked3], () => {
  if ([isChecked1.value, isChecked2.value, isChecked3.value].every(Boolean)) {
    isButtonDisabled.value = false;
    return;
  }

  isButtonDisabled.value = true;
});
</script>

<template>
  <div class="flex flex-col gap-8 overflow-scroll relative pb-24">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="title3">정보를 확인하기 위한 동의문이에요</h2>
        <div class="caption3">
          <p>상세정보 전송요구 및</p>
          <p>개인신용정보 수집 및 이용</p>
        </div>
        <p class="caption3">
          Trippy는 신용정보의 이용 및 보호에 관한 법률, 개인정보 보호법 등 관련 법령에 따라 개인신용정보를 처리해요
        </p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">정보를 보내는 곳</h3>
        <p class="caption3">104개 기관</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">정보를 받는 곳</h3>
        <p class="caption3">Trippy(트리피)</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">목적</h3>
        <p class="caption3">
          전송요구를 통한 본인신용정보 통합조회, 데이터 분석 서비스의 이용
        </p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">보유∙이용기간</h3>
        <p class="caption3 text-blue-400">
          서비스 이용 종료, 삭제 요구시, 또는 마지막 서비스 접속일로부터 1년이 경과한 때까지
        </p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">전송요구 정보</h3>
        <p class="caption3">
          은행: 계좌목록, 수신계좌정보,  펀드상품정보, 대출상품정보,
          개인행IRP정보, 신탁/ISA상품정보, 선불카드정보,
          DB형퇴직연금정보, DC형퇴직연금정보, 휴면예금 정보
        </p>
      </div>
      <p class="caption3">
        개인식별정보(전자서명, 접근토큰, 인증서, 전소요구서) 및 위 전송요구정보
        기재 정보를 수집 ∙ 이용하며 상세한 항목은 수집 ∙ 이용정보에서 확인할 수
        있어요.
      </p>
      <p class="caption3">
        금융 자신 정보를 자동으로 일주일에 한 번 5년동안 조회할게요
      </p>
      <p class="caption3">
        개인신용정보 수집 ∙ 이용에 동의하지 않을 수 있어요. 하지만 필수항목 수집 ∙
        이용에 동의하지 않으면 본인신용정보 통합조회, 데이터분석 서비스를
        이용할 수 없고, 선택항목 수집 ∙ 이용에 동의하지 않으면 선택항목에 대한
        본인신용정보 통합조회, 데이터분석 서비스를 이용할 수 없어요.
      </p>
      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">정확한 내역 확인을 위한 동의</h3>
        <p class="caption3">
          은행: 계좌목록, 수신계좌정보,  펀드상품정보, 대출상품정보,
          개인행IRP정보, 신탁/ISA상품정보, 선불카드정보,
          DB형퇴직연금정보, DC형퇴직연금정보, 휴면예금 정보
        </p>
      </div>

      <div
        :class="[
          'flex items-center w-full h-12 px-1 rounded-xl gap-1',
          isChecked1 ? 'text-blue-400 bg-blue-200' : 'text-gray-500 bg-blue-100']"
        @click="isChecked1 = !isChecked1"
      >
        <Icon
          :icon="isChecked1 ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
          class="size-7 pl-2 w-9"
        />
        <span class="body1 text-gray-600">[필수] 계좌 입∙출금처, 거래메모를 볼게요</span>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h2 class="title3">개인신용정보 제공</h2>
      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">정보를 받는 곳</h3>
        <p class="caption3 text-blue-400">104개 기관</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">목적</h3>
        <p class="caption3 text-blue-400">본인확인 및 개인신용정보의 전송</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">보유∙이용기간</h3>
        <p class="caption3 text-blue-400">본인확인 및 개인신용정보의 전송 목적 달성 시까지</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">제공 정보</h3>
        <p class="caption3 text-blue-400">개인식별정보 : 전자서명, CI, 인증서, 전송요구서</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">정보를 받는 곳</h3>
        <p class="caption3 text-blue-400">한국신용정보원</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">목적</h3>
        <p class="caption3 text-blue-400">마이데이터 서비스 가입현황 안내, 전송요구내역 통합조회 서비스 제공</p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">보유∙이용기간</h3>
        <p class="caption3 text-blue-400">
          한국신용정보원의 마이데이터서비스 가입 현황 및 전송요구내역 통합조회
          서비스 목적 달성 시까지
        </p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">제공 정보</h3>
        <p class="caption3 text-blue-400">
          회원 가입여부, 서비스목록수, 서비스 목록, 클라이언트ID, 전송요구내역수,
          전송요구목록, 정보제공자기관코드, 권한범위, 전송요구일자,
          전송요구종료시점
        </p>
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="subtitle2">필요한 동의만 추렸어요</h3>
        <p class="caption3">광고, 마케팅 이용 동의가 아니니 안심하세요</p>
      </div>

      <div class="flex flex-col gap-1">
        <div
          :class="[
          'flex items-center w-full h-12 px-1 rounded-xl gap-1',
          isChecked2 ? 'text-blue-400 bg-blue-200' : 'text-gray-500 bg-blue-100']"
          @click="isChecked2 = !isChecked2"
        >
          <Icon
            :icon="isChecked2 ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
            class="size-7 pl-2 w-9"
          />
          <span class="body1 text-gray-600">[필수] 개인신용 정보 수집 ∙ 이용 동의</span>
        </div>

        <div
          :class="[
          'flex items-center w-full h-12 px-1 rounded-xl gap-1',
          isChecked3 ? 'text-blue-400 bg-blue-200' : 'text-gray-500 bg-blue-100']"
          @click="isChecked3 = !isChecked3"
        >
          <Icon
            :icon="isChecked3 ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
            class="size-7 pl-2 w-9"
          />
          <span class="body1 text-gray-600">[필수] 개인신용정보 제공 동의</span>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto">
      <NextButton
        title="필수 동의하기"
        :disabled="isButtonDisabled"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
