import { LookupGuard } from './lookup-guard';
import { of as observableOf } from 'rxjs';
import { IdentifierType } from '../core/index/index.reducer';

describe('LookupGuard', () => {
  let dsoService: any;
  let guard: any;

  beforeEach(() => {
    dsoService = {
      findById: jasmine.createSpy('findById').and.returnValue(observableOf({ hasFailed: false,
        hasSucceeded: true }))
    };
    guard = new LookupGuard(dsoService);
  });

  it('should call findById with handle params', () => {
    const scopedRoute = {
      params: {
        id: '1234',
        idType: '123456789'
      }
    };
    guard.canActivate(scopedRoute as any, undefined);
    expect(dsoService.findById).toHaveBeenCalledWith('123456789/1234', IdentifierType.HANDLE)
  });

  it('should call findById with handle params', () => {
    const scopedRoute = {
      params: {
        id: '123456789%2F1234',
        idType: 'handle'
      }
    };
    guard.canActivate(scopedRoute as any, undefined);
    expect(dsoService.findById).toHaveBeenCalledWith('123456789%2F1234', IdentifierType.HANDLE)
  });

  it('should call findById with UUID params', () => {
    const scopedRoute = {
      params: {
        id: '34cfed7c-f597-49ef-9cbe-ea351f0023c2',
        idType: 'uuid'
      }
    };
    guard.canActivate(scopedRoute as any, undefined);
    expect(dsoService.findById).toHaveBeenCalledWith('34cfed7c-f597-49ef-9cbe-ea351f0023c2', IdentifierType.UUID)
  });

});
