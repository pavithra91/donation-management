<template>
    <paystack
        :amount="amount"
        :email="email"
        :paystackkey="paystackkey"
        :reference="reference"
        :callback="callback"
        :close="close"
        :embed="false"
    >
       <i class='fab fa-cc-mastercard fa-2x'></i>
       <div style="margin-top: 6px;">Credit or Debit Card </div>
       
    </paystack>
</template>
 
<script>
import paystack from 'vue-paystack';
export default {
    components: {
        paystack
    },
    data(){

        const amt = (1/0.83) * 100 * 100;
        console.log(amt.toFixed(2));

        return{
          paystackkey: "pk_test_57e3d8f5a59bee0cf0481115e30cf89bcbb62183", //paystack public key
          email: "foobar@example.com", // Customer email
          currency: "NGN",
          amount: parseInt(amt) // in kobo
        }
    },
    computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234562";
 
        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
 
        return text;
      }
    },
    methods: {
      callback: function(response){
        console.log(response)
      },
      close: function(){
          console.log("Payment closed")
      }
    }
}
</script>