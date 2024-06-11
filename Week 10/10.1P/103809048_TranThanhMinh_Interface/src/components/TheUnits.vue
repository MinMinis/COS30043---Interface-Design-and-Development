<template>
  <div class="home">
    <h2 class="text-center">Units</h2>
    <div class="table-responsive">
      <table class="table table-scripted table-hover">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Description</th>
            <th scope="col">Credit Points</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in units" :key="unit.code">
            <td>{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Units from '@/assets/units.json'
export default {
  name: 'TheUnits',
  data() {
    return {
      units: Units
    }
  }
}
</script>
