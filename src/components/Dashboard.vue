<template>
<div>
  <div class="row">
    <div class="col">
      <form v-on:submit.prevent="calcular">

        <div class="form-group">
          <label for="jatem">Quanto voce tem?</label>
          <money class="form-control" v-model="form.jatem" v-bind="money"></money>
        </div>

        <div class="form-group">
          <label for="mensal">Vai guardar quanto por mes?</label>
          <money class="form-control" v-model="form.mensal" v-bind="money"></money>
        </div>

        <div class="form-group">
          <label for="meses">Por quantos meses? {{calcAnos()}}</label>
          <input class="form-control" v-model="form.meses" />
        </div>

        <div class="form-group">
          <label for="juros">Juros mensal</label>
          <money class="form-control" v-model="form.juros" v-bind="percentage"></money>
        </div>

        <div class="form-group">
          <label for="inflacao">Inflacao mensal</label>
          <money class="form-control" v-model="form.inflacao" v-bind="percentage"></money>
        </div>

        <div class="form-group">
          <label for="imposto">Imposto de renda</label>
          <money class="form-control" v-model="form.imposto" v-bind="percentage"></money>
        </div>

        <div class="form-group">
          <button class="btn btn-success float-right">Calcular</button>
        </div>

      </form>
        
    </div>
  </div>

  <div class="row">
    
    <div class="col">
      Sem inflacao
      <div class="alert alert-info" role="alert">
        <b>Total acumulado: </b>{{numberToReal(form.totalI)}} <br>
      </div>

      <div class="alert alert-success" role="alert">
        <b>Renda mensal: </b>{{numberToReal(form.rendaI)}}
      </div>
    </div>

    <div class="col">
      Com inflacao
      <div class="alert alert-info" role="alert">
        <b>Total acumulado: </b>{{numberToReal(form.total)}} <br>
      </div>

      <div class="alert alert-success" role="alert">
        <b>Renda mensal: </b>{{numberToReal(form.renda)}}
      </div>
    </div>

  </div>

  
  <div class="row align-items-end">
    <div class="col">
      <p class="text-center"><a href="https://rubensfernandes.mit-license.org/">MIT License</a> © Rubens Fernandes</p>
    </div>
  </div>

</div>
</template>

<script>
import moment from 'moment'
moment.locale(`pt-Br`)

export default {
  name: 'Home',
  data() {
    return {
      form: {
        jatem: 1000,
        mensal: 200,
        meses: 180,
        inflacao: 0.29,
        juros: 0.58,
        imposto: 15,
        jurosEfetivo: 0,
        jurosEfetivoI: 0,
        total: 0,
        renda: 0,
        totalI: 0,
        rendaI: 0,
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
      percentage: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: ' %',
        precision: 2,
        masked: false
      }
    }
  },
  methods: {
    calcular() {
      this.calcJurosEfetivo()

      //calculo de investimento com inicial e valores mensais
      const i = this.form.jurosEfetivo
      const n = this.form.meses
      const M = this.form.mensal
      const P = this.form.jatem
      const F = (P * Math.pow((1 + i), n)) + M * ((Math.pow((1 + i), n) - 1) / i)

      //arendodar agora
      this.form.total = parseFloat(F.toFixed(2))
      this.form.renda = this.form.total * i
      this.form.renda = parseFloat(this.form.renda.toFixed(2))

      this.calcularI()
    },
    calcularI() {
      this.calcJurosEfetivoI()

      //calculo de investimento com inicial e valores mensais
      const i = this.form.jurosEfetivoI
      const n = this.form.meses
      const M = this.form.mensal
      const P = this.form.jatem
      const F = (P * Math.pow((1 + i), n)) + M * ((Math.pow((1 + i), n) - 1) / i)

      //arendodar agora
      this.form.totalI = parseFloat(F.toFixed(2))
      this.form.rendaI = this.form.total * i
      this.form.rendaI = parseFloat(this.form.rendaI.toFixed(2))
    },
    calcAnos() {
      let txt = moment().startOf(`day`).add(this.form.meses, 'M').fromNow(true)
      return txt;
    },
    calcJurosEfetivo() {
      // divide tudo por 100 para virar porcentagem, nao aredondar apartir daqui
      const imposto = this.form.imposto / 100
      const juros = this.form.juros / 100
      const inflacao = this.form.inflacao / 100

      this.form.jurosEfetivo = (1 + juros * (1 - imposto)) / (1 + inflacao) - 1;
    },
    calcJurosEfetivoI() {
      // divide tudo por 100 para virar porcentagem, nao aredondar apartir daqui
      const imposto = this.form.imposto / 100
      const juros = this.form.juros / 100
      const inflacao = 0

      this.form.jurosEfetivoI = (1 + juros * (1 - imposto)) / (1 + inflacao) - 1;
    },
    numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
  },
  beforeMount() {
    this.calcular()
  }
}
</script>
