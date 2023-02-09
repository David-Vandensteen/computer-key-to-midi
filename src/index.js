import { ApplicationConfigService } from '#src/service/applicationConfig';
import { argService } from '#src/service/arg';
import { ApplicationService } from '#src/service/application';

// TODO : improve abstract path for application.yaml
const config = ApplicationConfigService.get(['src/config/application.yaml', 'config/application.yaml'], argService);
ApplicationService.run(config);
