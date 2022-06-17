import { CreatePartner } from '@/usecases/create-partner'
import { InMemoryPartner } from '../../../doubles/repositories'

describe('Partner usecase', () => {
  test('should not create partner with existing document', async () => {
    const emptyPartnerRepository = new InMemoryPartner([])
    const createPartner = new CreatePartner(emptyPartnerRepository)
    const data = {
      "id": 1, 
      "tradingName": "Adega da Cerveja - Pinheiros",
      "ownerName": "Zé da Silva",
      "document": "1432132123891/0001",
      "coverageArea": { 
        "type": "MultiPolygon", 
        "coordinates": [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
      },
      "address": { 
        "type": "Point",
        "coordinates": [-46.57421, -21.785741]
      }
    }
    await createPartner.perform(data)
    const error: Error = (await createPartner.perform(data)).value as Error
    expect(error.name).toEqual('ExistingPartnerError')
  })
})