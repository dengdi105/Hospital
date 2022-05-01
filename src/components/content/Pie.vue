<template>
    <div class="view">
        <div>
            <h3>各部门就诊人数统计：</h3>
            <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
        </div>
        <div>
            <h3>各学院核酸检测人数：</h3>
            <div id="countExamine" :style="{width: '1200px', height: '600px'}"></div>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'Pie',
        mounted(){
            const _this = this
            this.$axios.get('http://localhost:8181/data/findAll').then(function (response) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = _this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                console.log('初始化')
                console.log(response.data)
                myChart.setOption( {
                        legend: {
                            top: 'bottom'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: { show: true },
                                dataView: { show: true, readOnly: false },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        series: [
                            {
                                name: 'Nightingale Chart',
                                type: 'pie',
                                radius: [50, 250],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                itemStyle: {
                                    borderRadius: 8
                                },
                                data:response.data
                            }
                        ]
                    }
                );
            })

            let countExamine = _this.$echarts.init(document.getElementById('countExamine'))
            // 绘制图表
            countExamine.setOption( {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '未检测', '已检测'],
                        ['计算机与信息学院', 200, 150],
                        ['电气学院', 1000, 500],
                        ['机械学院', 1200, 200],
                        ['外国语学院', 200, 100],
                        ['艺术学院', 100, 100],
                        ['体育学院', 100, 120],
                        ['经济与管理学院', 400, 120],
                        ['建筑学院', 500, 120],
                        ['纺织服装学院', 800, 120],
                    ]
                },
                xAxis: { type: 'category' },
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [{ type: 'bar' }, { type: 'bar' }]
            })
        }
    }
</script>

<style scoped>
    #myChart{
        margin-left: 10%;
        margin-bottom: 5%;
    }
</style>

