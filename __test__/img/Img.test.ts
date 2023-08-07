import {getNormalizedSize} from '../../src/img/Img'

describe('getNormalizedSize: アスペクト比を保持してリサイズ', () => {
    it('正方形', () => {
        const size = {width: 1024, height: 1024}
        const max_size = 256
        const expect_size = {width: max_size, height: max_size}

        expect(getNormalizedSize({width:size.width, height:size.height}, max_size)).toEqual(expect_size)
    })

    it('縦長', () => {
        const size = {width: 512, height: 1024}
        const max_size = 256
        const expect_size = {width: max_size/2, height: max_size}

        expect(getNormalizedSize({width:size.width, height:size.height}, max_size)).toEqual(expect_size)
    })

    it('横長', () => {
        const size = {width: 1024, height: 512}
        const max_size = 256
        const expect_size = {width: max_size, height: max_size/2}

        expect(getNormalizedSize({width:size.width, height:size.height}, max_size)).toEqual(expect_size)
    })
})